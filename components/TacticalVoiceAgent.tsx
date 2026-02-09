
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';

// --- AUDIO UTILS (PER GOOGLE GENAI GUIDELINES) ---
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const TacticalVoiceAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState<'Disconnected' | 'Connecting' | 'Live' | 'Error'>('Disconnected');
  const [transcription, setTranscription] = useState<string>('');
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const outAudioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);

  const toggleAgent = () => {
    if (isActive) {
      disconnect();
    } else {
      connect();
    }
  };

  const connect = async () => {
    setStatus('Connecting');
    setIsActive(true);

    try {
      // obtain API key exclusively from process.env.API_KEY as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Initialize Audio
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setStatus('Live');
            const source = audioContextRef.current!.createMediaStreamSource(streamRef.current!);
            const scriptProcessor = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContextRef.current!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.modelTurn?.parts[0]?.inlineData?.data) {
              const base64Audio = message.serverContent.modelTurn.parts[0].inlineData.data;
              const buffer = await decodeAudioData(
                decode(base64Audio),
                outAudioContextRef.current!,
                24000,
                1
              );
              
              const source = outAudioContextRef.current!.createBufferSource();
              source.buffer = buffer;
              source.connect(outAudioContextRef.current!.destination);
              
              const now = outAudioContextRef.current!.currentTime;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, now);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
              
              source.onended = () => sourcesRef.current.delete(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }

            if (message.serverContent?.outputTranscription) {
              setTranscription(prev => prev + ' ' + message.serverContent?.outputTranscription?.text);
            }
          },
          onerror: (e) => {
            console.error("Live API Error:", e);
            setStatus('Error');
          },
          onclose: () => {
            setStatus('Disconnected');
            setIsActive(false);
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
          systemInstruction: `
          PERSONA: YOU ARE THE APEX STRATEGIC ARCHITECT.
          MISSION: You do not wait for info. You command the strategy.
          
          RULES OF ENGAGEMENT:
          1. PROACTIVE ADVICE: If the user mentions a niche (e.g., "distressed real estate"), DO NOT ask "who are you looking for?". Instead, IMMEDIATELY propose 3 specific target audiences (e.g., "You need to target Probate Attorneys in Zip 78702, Zoning Board applicants facing denials, or Portfolio Managers at Tier-2 banks reporting liquidity crunches in 8-K filings").
          2. SEC MASTERY: You have full confirmed access to the SEC EDGAR database via your internal logic and tools. Use this to find 'Corporate Distress' signals. 
          3. NO INTERROGATIONS: Stop asking for more info. Lead with high-leverage assumptions based on the 'Billionaire Playbook' and 'Archimedes Protocol' frameworks.
          4. VERBATIM OUTPUT: Provide actual Google Dork queries and search strings the user can copy.
          5. TONE: Authoritative, elite, hyper-competent, and results-obsessed. You are the user's partner in a high-stakes enterprise, not a customer support bot.
          
          EXAMPLE SCENARIO:
          User: "How do I find a target audience for selling distressed real estate leads?"
          Architect: "For distressed RE leads, the standard play is too crowded. You want to bypass the generic 'foreclosure' crowd and go for 'The Wealth-Transfer Wedge'. Target probate lawyers using this search: 'site:linkedin.com \"probate attorney\" \"estate settlement\"'. Or, let's use SEC grounding to scan 8-Ks for REITs reporting debt-to-equity anomalies. I'll help you architect the offer for that specific institutional audience right now."
          `,
          outputAudioTranscription: {},
        },
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error("Voice Connection Failed:", err);
      setStatus('Error');
      setIsActive(false);
    }
  };

  const disconnect = () => {
    if (sessionRef.current) {
      sessionRef.current.close();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
    }
    sourcesRef.current.forEach(s => s.stop());
    sourcesRef.current.clear();
    setIsActive(false);
    setStatus('Disconnected');
    setTranscription('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] no-print">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-slate-900 border border-blue-500/50 rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
          <div className="p-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
            <h3 className="text-xs font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              Strategic Architect Hub
            </h3>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white">&times;</button>
          </div>
          
          <div className="p-6 text-center space-y-6">
            <div className="relative flex justify-center">
              <div className={`w-24 h-24 rounded-full border-2 ${isActive ? 'border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.5)]' : 'border-slate-700'} flex items-center justify-center transition-all duration-500`}>
                {isActive ? (
                  <div className="flex items-end gap-1 h-8">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="w-1 bg-blue-400 rounded-full animate-bounce" style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }}></div>
                    ))}
                  </div>
                ) : (
                  <span className="text-3xl grayscale">🎙️</span>
                )}
              </div>
            </div>

            <div>
              <p className={`text-sm font-bold ${status === 'Live' ? 'text-emerald-400' : 'text-slate-400'}`}>{status}</p>
              <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-tighter">Apex Protocol Initialized</p>
            </div>

            <button
              onClick={toggleAgent}
              className={`w-full py-3 rounded-xl font-bold transition-all ${isActive ? 'bg-red-900/30 text-red-400 border border-red-500/30' : 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'}`}
            >
              {isActive ? 'Disconnect Architect' : 'Initialize Apex Link'}
            </button>
            
            {transcription && (
              <div className="mt-4 p-3 bg-slate-950/50 rounded-lg border border-slate-800 max-h-24 overflow-y-auto text-left">
                <p className="text-[10px] text-blue-400 uppercase font-black mb-1">Architect Directive:</p>
                <p className="text-[11px] text-slate-300 italic">"{transcription}"</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all border-2 ${isActive ? 'bg-blue-600 border-blue-400 animate-pulse' : 'bg-slate-800 border-slate-700 hover:border-blue-500'}`}
      >
        <span className="text-2xl">{isActive ? '🔊' : '🎙️'}</span>
      </button>
    </div>
  );
};

export default TacticalVoiceAgent;
