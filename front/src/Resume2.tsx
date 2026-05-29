import { useParams, useNavigate } from "react-router-dom";
import { useGetSingleResumeQuery } from "./utils/query";
import { useRef, useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import { ArrowLeft, Download, Mail, Phone, MapPin, ExternalLink, Link2 } from "lucide-react";

const DARK = '#1a2332';
const ACCENT = '#f5c518';

const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
    <div style={{ width: '13px', height: '13px', borderRadius: '50%', backgroundColor: ACCENT, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: DARK }} />
    </div>
    <h2 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: DARK, margin: 0 }}>{children}</h2>
    <div style={{ flex: 1, height: '1px', backgroundColor: '#dde3ec' }} />
  </div>
);

// A4 = 297mm = 1122px (96dpi da), lekin brauzerda mm = 3.7795px
const A4_PX = 297 * 3.7795;

const Resume = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetSingleResumeQuery(resumeId);
  const resumeRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Content render bo'lgandan keyin real balandlikni o'lchab scale hisoblash
  useEffect(() => {
    if (!resumeRef.current || isLoading) return;
    const timer = setTimeout(() => {
      const contentH = resumeRef.current!.scrollHeight;
      if (contentH > A4_PX) {
        setScale(A4_PX / contentH);
      } else {
        setScale(1);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [data, isLoading]);

  const handleDownload = () => {
    if (!resumeRef.current) return;
    // Download uchun vaqtincha scale=1 qilib yuklaymiz
    const el = resumeRef.current;
    const prevTransform = el.style.transform;
    el.style.transform = 'none';
    el.style.width = '210mm';
    
    html2pdf().from(el).set({
      margin: 0,
      filename: `${data?.fullName || "Resume"}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    }).save().then(() => {
      el.style.transform = prevTransform;
    });
  };

  if (isLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#0f172a', color: '#94a3b8' }}>
      Yuklanmoqda...
    </div>
  );

  const A4_MM_PX = 793; // 210mm brauzerda

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', padding: '40px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      {/* Buttons */}
      <div style={{ width: `${A4_MM_PX * scale}px`, display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 20px', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#94a3b8', borderRadius: '8px', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>
          <ArrowLeft size={16} /> Orqaga
        </button>
        <button onClick={handleDownload} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 28px', backgroundColor: ACCENT, color: DARK, borderRadius: '8px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', border: 'none' }}>
          <Download size={16} /> PDF Yuklash
        </button>
      </div>

      {/* Scale wrapper */}
      <div style={{
        width: `${A4_MM_PX * scale}px`,
        height: `${A4_PX * scale}px`,
        overflow: 'hidden',
      }}>
        <div
          ref={resumeRef}
          style={{
            width: '210mm',
            minHeight: '297mm',
            boxSizing: 'border-box',
            backgroundColor: 'white',
            fontFamily: "'Georgia', serif",
            boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            transformOrigin: 'top left',
            transform: `scale(${scale})`,
          }}
        >
          {/* HEADER */}
          <div style={{ backgroundColor: DARK, padding: '15px 18px 15px 0', display: 'flex', alignItems: 'center', minHeight: '70px', flexShrink: 0 }}>
            <div style={{ width: '62mm', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
              <div style={{ width: '54px', height: '54px', borderRadius: '50%', backgroundColor: '#2d3f55', border: `3px solid ${ACCENT}`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {data?.photo
                  ? <img src={data.photo} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <svg width="24" height="24" viewBox="0 0 24 24" fill="#4a6080"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>
                }
              </div>
            </div>
            <div>
              <h1 style={{ color: 'white', margin: 0, fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.1 }}>
                {data?.fullName || "YOUR FULL NAME"}
              </h1>
              <p style={{ color: ACCENT, margin: '5px 0 0', fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px' }}>
                {data?.jobTitle || "MUTAXASSISLIK"}
              </p>
            </div>
          </div>

          {/* BODY */}
          <div style={{ display: 'flex', flex: 1, alignItems: 'stretch' }}>

            {/* SIDEBAR */}
            <div style={{ width: '62mm', flexShrink: 0, backgroundColor: '#f0f4f9', padding: '13px 11px', boxSizing: 'border-box', borderRight: `3px solid ${ACCENT}` }}>

              <div style={{ marginBottom: '11px' }}>
                <p style={{ fontSize: '8px', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '1px', margin: '0 0 6px' }}>Aloqa</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {data?.phone && <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Phone size={9} color={ACCENT} strokeWidth={2.5} /><span style={{ fontSize: '9px', color: '#334155', fontWeight: 500 }}>{data.phone}</span></div>}
                  {data?.email && <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Mail size={9} color={ACCENT} strokeWidth={2.5} /><span style={{ fontSize: '8px', color: '#334155', fontWeight: 500, wordBreak: 'break-all' }}>{data.email}</span></div>}
                  {data?.address && <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><MapPin size={9} color={ACCENT} strokeWidth={2.5} /><span style={{ fontSize: '9px', color: '#334155', fontWeight: 500 }}>{data.address}</span></div>}
                </div>
              </div>

              {data?.education?.length > 0 && <>
                <div style={{ height: '1px', backgroundColor: '#dde3ec', margin: '9px 0' }} />
                <div style={{ marginBottom: '4px' }}>
                  <p style={{ fontSize: '8px', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '1px', margin: '0 0 6px' }}>Ta'lim</p>
                  {data.education.map((edu: any, i: number) => (
                    <div key={i} style={{ marginBottom: i < data.education.length - 1 ? '8px' : 0 }}>
                      <p style={{ fontSize: '10px', fontWeight: 700, color: DARK, margin: 0, textTransform: 'uppercase', lineHeight: 1.2 }}>{edu.institution}</p>
                      <p style={{ fontSize: '9px', color: '#64748b', fontStyle: 'italic', margin: '2px 0 0' }}>{edu.degree}</p>
                      {edu.year && <p style={{ fontSize: '8px', color: '#94a3b8', margin: '1px 0 0' }}>{edu.year}</p>}
                    </div>
                  ))}
                </div>
              </>}

              {data?.skills?.length > 0 && <>
                <div style={{ height: '1px', backgroundColor: '#dde3ec', margin: '9px 0' }} />
                <div style={{ marginBottom: '4px' }}>
                  <p style={{ fontSize: '8px', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '1px', margin: '0 0 6px' }}>Ko'nikmalar</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {data.skills.map((s: any, i: number) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '5px' }}>
                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: ACCENT, flexShrink: 0, marginTop: '4px' }} />
                        <p style={{ fontSize: '9.5px', color: '#1e293b', lineHeight: 1.4, fontWeight: 500, margin: 0 }}>{s.skillList}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>}

              {data?.languages?.length > 0 && <>
                <div style={{ height: '1px', backgroundColor: '#dde3ec', margin: '9px 0' }} />
                <div>
                  <p style={{ fontSize: '8px', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '1px', margin: '0 0 6px' }}>Tillar</p>
                  {data.languages.map((l: any, i: number) => (
                    <div key={i} style={{ marginBottom: i < data.languages.length - 1 ? '6px' : 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', fontWeight: 700, color: '#334155' }}>
                        <span>{l.language}</span>
                        <span style={{ color: '#64748b', fontWeight: 500, fontSize: '8px' }}>{l.level}</span>
                      </div>
                      <div style={{ height: '3px', backgroundColor: '#dde3ec', borderRadius: '2px', marginTop: '3px' }}>
                        <div style={{ height: '100%', borderRadius: '2px', backgroundColor: ACCENT, width: l.level?.toLowerCase().includes('native') || l.level?.toLowerCase().includes('ona') ? '100%' : l.level?.toLowerCase().includes('c') ? '85%' : l.level?.toLowerCase().includes('b') ? '60%' : '35%' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </>}
            </div>

            {/* MAIN */}
            <div style={{ flex: 1, padding: '13px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '12px' }}>

              {data?.summary && (
                <div>
                  <SectionHeader>Men Haqimda</SectionHeader>
                  <p style={{ fontSize: '11px', color: '#374151', lineHeight: 1.65, textAlign: 'justify', margin: 0 }}>{data.summary}</p>
                </div>
              )}

              {data?.experiences?.length > 0 && (
                <div>
                  <SectionHeader>Ish Tajribasi</SectionHeader>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {data.experiences.map((exp: any, i: number) => (
                      <div key={i}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <p style={{ fontSize: '11px', fontWeight: 700, color: DARK, textTransform: 'uppercase', margin: 0, lineHeight: 1.2 }}>{exp.role}</p>
                            <p style={{ fontSize: '9.5px', color: '#3b82f6', fontStyle: 'italic', margin: '2px 0 0', fontWeight: 600 }}>{exp.company}</p>
                          </div>
                          <span style={{ fontSize: '8px', color: 'white', fontWeight: 700, backgroundColor: DARK, padding: '2px 6px', borderRadius: '3px', whiteSpace: 'nowrap', marginLeft: '8px', textTransform: 'uppercase', flexShrink: 0 }}>
                            {exp.duration || `${exp.startDate} — ${exp.endDate}`}
                          </span>
                        </div>
                        {exp.description && (
                          <p style={{ fontSize: '10px', color: '#4b5563', lineHeight: 1.55, margin: '4px 0 0' }}>• {exp.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {data?.projects?.length > 0 && (
                <div>
                  <SectionHeader>Loyihalar</SectionHeader>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                    {data.projects.map((proj: any, i: number) => (
                      <div key={i}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <p style={{ fontSize: '11px', fontWeight: 700, color: DARK, textTransform: 'uppercase', margin: 0, lineHeight: 1.2 }}>{proj.projectName}</p>
                          <div style={{ display: 'flex', gap: '7px', flexShrink: 0, marginLeft: '8px' }}>
                            {proj.liveLink && <a href={proj.liveLink} style={{ color: DARK }}><ExternalLink size={11} /></a>}
                            {proj.repoLink && <a href={proj.repoLink} style={{ color: DARK }}><Link2 size={11} /></a>}
                          </div>
                        </div>
                        {proj.description && (
                          <p style={{ fontSize: '10px', color: '#475569', lineHeight: 1.55, margin: '4px 0 0' }}>{proj.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* PASTKI CHIZIQ */}
          <div style={{ height: '5px', backgroundColor: ACCENT, flexShrink: 0, marginTop: 'auto' }} />
        </div>
      </div>
    </div>
  );
};

export default Resume;