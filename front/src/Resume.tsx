import { useRef } from 'react';
import { connect } from "react-redux";
import { actions } from "./utils/redux";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowLeft, Download, Globe, } from "lucide-react";
import html2pdf from 'html2pdf.js';

const DARK = '#1a2332';
const ACCENT = '#f5c518';
const SIDEBAR_W = '62mm';

const SectionHeader = ({ children, accent = ACCENT }: { children: React.ReactNode; accent?: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '8px' }}>
    <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: accent, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: DARK }} />
    </div>
    <h2 style={{ fontSize: '9.5px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.2px', color: DARK, margin: 0 }}>
      {children}
    </h2>
    <div style={{ flex: 1, height: '1px', backgroundColor: '#dde3ec' }} />
  </div>
);

const ResumePreview = (props: any) => {
  const navigate = useNavigate();
  const r = props.resume;
  const resumeRef = useRef<HTMLDivElement>(null);

  const expCount = r.experiences?.length || 0;
  const skillCount = r.skills?.length || 0;
  const eduCount = r.education?.length || 0;
  const summaryLength = r.summary?.length || 0;
  const score = (expCount * 5) + (skillCount * 2) + (eduCount * 3) + (summaryLength / 100);
  const isDense = score > 35;

  const handleDownload = () => {
    const element = resumeRef.current;
    if (!element) return;
    const opt: any = {
      margin: 0,
      filename: `${r.fullName || 'resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="min-h-screen py-10 flex flex-col items-center overflow-auto" style={{ backgroundColor: '#0f172a' }}>

      {/* Buttons */}
      <div className="w-[210mm] flex justify-between mb-6 px-2">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 px-5 py-2 rounded-lg font-semibold text-sm transition-all hover:opacity-80"
          style={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#94a3b8' }}>
          <ArrowLeft size={16} /> Tahrirlash
        </button>
        <button onClick={handleDownload} className="flex items-center gap-2 px-7 py-2 rounded-lg font-bold text-sm transition-all hover:opacity-90"
          style={{ backgroundColor: ACCENT, color: DARK }}>
          <Download size={16} /> PDF YUKLASH
        </button>
      </div>

      {/* A4 Page */}
      <div
        ref={resumeRef}
        style={{
          width: '210mm',
          height: '297mm',
          boxSizing: 'border-box',
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          fontFamily: "'Georgia', serif",
        }}
        className="shadow-2xl"
      >
        {/* TOP HEADER - dark bar */}
        <div style={{
          backgroundColor: DARK,
          padding: '14px 16px 14px 0',
          display: 'flex',
          alignItems: 'center',
          flexShrink: 0,
          minHeight: '72px',
        }}>
          {/* Avatar placeholder */}
          <div style={{
            width: SIDEBAR_W,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexShrink: 0,
          }}>
            <div style={{
              width: '58px', height: '58px', borderRadius: '50%',
              backgroundColor: '#2d3f55',
              border: `3px solid ${ACCENT}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
            }}>
              {r.photo
                ? <img src={r.photo} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <svg width="28" height="28" viewBox="0 0 24 24" fill="#4a6080"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>
              }
            </div>
          </div>

          {/* Name & Title */}
          <div style={{ flex: 1 }}>
            <h1 style={{
              color: 'white', margin: 0,
              fontSize: isDense ? '20px' : '24px',
              fontWeight: 900, textTransform: 'uppercase',
              letterSpacing: '-0.3px', lineHeight: 1.1,
            }}>
              {r.fullName || "YOUR FULL NAME"}
            </h1>
            <p style={{
              color: ACCENT, margin: '4px 0 0',
              fontSize: '9.5px', fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '2.5px',
            }}>
              {r.jobTitle || "MUTAXASSISLIK"}
            </p>
          </div>
        </div>

        {/* BODY */}
        <div style={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>

          {/* LEFT SIDEBAR */}
          <div style={{
            width: SIDEBAR_W,
            backgroundColor: '#f0f4f9',
            padding: '14px 12px',
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
            overflow: 'hidden',
            borderRight: `3px solid ${ACCENT}`,
          }}>

            {/* Contact */}
            <div style={{ marginBottom: '14px' }}>
              <p style={{ fontSize: '8.5px', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '1px', marginBottom: '6px' }}>Aloqa</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {r.phone && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Phone size={9} color={ACCENT} strokeWidth={2.5} />
                    <span style={{ fontSize: '8.5px', color: '#334155', fontWeight: 500 }}>{r.phone}</span>
                  </div>
                )}
                {r.email && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Mail size={9} color={ACCENT} strokeWidth={2.5} />
                    <span style={{ fontSize: '8px', color: '#334155', fontWeight: 500, wordBreak: 'break-all' }}>{r.email}</span>
                  </div>
                )}
                {r.address && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <MapPin size={9} color={ACCENT} strokeWidth={2.5} />
                    <span style={{ fontSize: '8.5px', color: '#334155', fontWeight: 500 }}>{r.address}</span>
                  </div>
                )}
                {r.partfolio && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Globe size={9} color={ACCENT} strokeWidth={2.5} />
                    <span style={{ fontSize: '8px', color: '#334155', fontWeight: 500, wordBreak: 'break-all' }}>{r.partfolio}</span>
                  </div>
                )}
              </div>
            </div>

            <div style={{ height: '1px', backgroundColor: '#dde3ec', marginBottom: '12px' }} />

            {/* Skills */}
            {r.skills?.length > 0 && (
              <div style={{ marginBottom: '12px' }}>
                <p style={{ fontSize: '8.5px', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '1px', marginBottom: '6px' }}>Ko'nikmalar</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {r.skills.map((s: any, i: number) => (
                    <div key={i}>
                      {s.category && (
                        <p style={{ fontSize: '7px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1px' }}>{s.category}</p>
                      )}
                      <p style={{ fontSize: '9px', color: '#1e293b', lineHeight: 1.35, fontWeight: 500 }}>{s.skillList}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {r.skills?.length > 0 && r.languages?.length > 0 && (
              <div style={{ height: '1px', backgroundColor: '#dde3ec', marginBottom: '12px' }} />
            )}

            {/* Languages */}
            {r.languages?.length > 0 && (
              <div style={{ marginBottom: '12px' }}>
                <p style={{ fontSize: '8.5px', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '1px', marginBottom: '6px' }}>Tillar</p>
                {r.languages.map((l: any, i: number) => (
                  <div key={i} style={{ marginBottom: i < r.languages.length - 1 ? '4px' : 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', fontWeight: 700, color: '#334155' }}>
                      <span>{l.language}</span>
                      <span style={{ color: '#64748b', fontWeight: 500 }}>{l.level}</span>
                    </div>
                    {/* Level bar */}
                    <div style={{ height: '3px', backgroundColor: '#dde3ec', borderRadius: '2px', marginTop: '2px' }}>
                      <div style={{
                        height: '100%', borderRadius: '2px', backgroundColor: ACCENT,
                        width: l.level?.toLowerCase().includes('native') || l.level?.toLowerCase().includes('ona') ? '100%'
                          : l.level?.toLowerCase().includes('c') ? '85%'
                          : l.level?.toLowerCase().includes('b') ? '60%'
                          : '35%'
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Spacer */}
            <div style={{ flex: 1 }} />
          </div>

          {/* MAIN CONTENT */}
          <div style={{ flex: 1, padding: '14px 14px 12px 14px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

            {/* Summary */}
            {r.summary && (
              <section style={{ marginBottom: '12px', flexShrink: 0 }}>
                <SectionHeader>Career Objective</SectionHeader>
                <p style={{ fontSize: isDense ? '9px' : '10px', color: '#374151', lineHeight: 1.6, textAlign: 'justify' }}>
                  {r.summary}
                </p>
              </section>
            )}

            {/* Skills highlight (if no sidebar category) */}
            {r.skills?.length > 0 && (
              <section style={{ marginBottom: '11px', flexShrink: 0 }}>
                <SectionHeader>Key Skills</SectionHeader>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {r.skills.flatMap((s: any) =>
                    (s.skillList || '').split(',').map((sk: string, j: number) => (
                      <span key={j} style={{
                        fontSize: '8px', padding: '2px 7px',
                        backgroundColor: '#f0f4f9', border: `1px solid #dde3ec`,
                        borderRadius: '3px', color: '#334155', fontWeight: 600,
                        textTransform: 'uppercase', letterSpacing: '0.3px',
                      }}>
                        {sk.trim()}
                      </span>
                    ))
                  )}
                </div>
              </section>
            )}

            {/* Experience */}
            {r.experiences?.length > 0 && (
              <section style={{ marginBottom: '11px', flexShrink: 0 }}>
                <SectionHeader>Ish Tajribasi</SectionHeader>
                <div style={{ display: 'flex', flexDirection: 'column', gap: isDense ? '8px' : '11px' }}>
                  {r.experiences.map((exp: any, i: number) => (
                    <div key={i}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <p style={{ fontSize: '10.5px', fontWeight: 700, color: DARK, textTransform: 'uppercase', margin: 0, lineHeight: 1.2 }}>{exp.role}</p>
                          <p style={{ fontSize: '9px', color: '#64748b', fontStyle: 'italic', margin: '1px 0 0', fontWeight: 600 }}>{exp.company}</p>
                        </div>
                        <span style={{
                          fontSize: '7.5px', color: 'white', fontWeight: 700,
                          backgroundColor: DARK, padding: '2px 6px', borderRadius: '3px',
                          whiteSpace: 'nowrap', marginLeft: '6px', marginTop: '1px',
                          textTransform: 'uppercase', letterSpacing: '0.3px',
                        }}>
                          {exp.startDate} — {exp.endDate}
                        </span>
                      </div>
                      {exp.description && (
                        <p style={{ fontSize: isDense ? '8.5px' : '9.5px', color: '#4b5563', lineHeight: 1.5, marginTop: '4px' }}>
                          • {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {r.education?.length > 0 && (
              <section style={{ flexShrink: 0 }}>
                <SectionHeader>Ta'lim</SectionHeader>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  {r.education.map((edu: any, i: number) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <p style={{ fontSize: '10px', fontWeight: 700, color: DARK, margin: 0, textTransform: 'uppercase', lineHeight: 1.2 }}>{edu.institution}</p>
                        <p style={{ fontSize: '9px', color: '#64748b', fontStyle: 'italic', margin: '1px 0 0' }}>{edu.degree}</p>
                      </div>
                      {edu.year && (
                        <span style={{ fontSize: '8px', color: '#94a3b8', fontWeight: 600, whiteSpace: 'nowrap', marginLeft: '6px' }}>{edu.year}</span>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Spacer */}
            <div style={{ flex: 1 }} />
          </div>
        </div>

        {/* BOTTOM ACCENT BAR */}
        <div style={{ height: '5px', backgroundColor: ACCENT, flexShrink: 0 }} />
      </div>
    </div>
  );
};

export default connect((state: any) => ({ ...state.crud }), actions)(ResumePreview);