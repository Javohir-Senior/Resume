import { Drawer } from "vaul";
import {
  Plus,
  User,
  Briefcase,
  GraduationCap,
  CodeXml,
  Languages,
  LayoutGrid,
  Eye,
} from "lucide-react";
import { connect } from "react-redux";
import { actions } from "./utils/redux";
import { useState } from "react";
import { useSaveResumeMutation } from "./utils/query";
import { useNavigate } from "react-router-dom";

const ResumeBuilder = (props: any) => {
  const handleDateClick = (e: any) => {
    e.target.showPicker();
  };

  const [ExpEndData, setExpEndData] = useState(false);
  const [EduEndData, setEduEndData] = useState(false);

  const [saveResume] = useSaveResumeMutation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleSave = () => {
    saveResume({
      ...props.resume,
      userId: Number(userId),
    });
    navigate(`/orders/${userId}`);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] p-6 md:p-16 text-slate-200 font-sans">
      <div className="max-w-2xl mx-auto">
        {/* --- 1. GENERAL INFORMATION --- */}
        <section className="border-2 border-slate-800 rounded-4xl bg-[#111827] p-8 mb-12 shadow-2xl">
          <div className="flex items-center gap-3 mb-10 border-b-2 border-slate-800 pb-5">
            <User size={20} className="text-blue-500" />
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white italic">
              General Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.15em]">
                Full Name
              </label>
              <input
                onChange={(e) => props.getFullName(e.target.value)}
                value={props.resume.fulname}
                type="text"
                className="w-full border-2 border-slate-800 rounded-2xl p-3.5 mt-2 bg-[#1f2937] text-slate-100 outline-none focus:border-blue-500 transition-all placeholder:text-slate-500"
                placeholder="Ism va familiyangizni kiriting"
              />
            </div>
            <div>
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.15em]">
                Email Address
              </label>
              <input
                onChange={(e) => props.getEmail(e.target.value)}
                value={props.resume.email}
                type="email"
                className="w-full border-2 border-slate-800 rounded-2xl p-3.5 mt-2 bg-[#1f2937] text-slate-100 outline-none focus:border-blue-500 transition-all placeholder:text-slate-500"
                placeholder="misol@mail.com"
              />
            </div>
            <div>
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.15em]">
                Mobile Number
              </label>
              <input
                onChange={(e) => props.getPhone2(e.target.value)}
                value={props.resume.phone}
                type="text"
                className="w-full border-2 border-slate-800 rounded-2xl p-3.5 mt-2 bg-[#1f2937] text-slate-100 outline-none focus:border-blue-500 transition-all placeholder:text-slate-500"
                placeholder="+998 90 123 45 67"
              />
            </div>
            <div>
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.15em]">
                LinkedIn
              </label>
              <input
                onChange={(e) => props.getLinkkeyIn(e.target.value)}
                value={props.resume.linkedIn}
                type="text"
                className="w-full border-2 border-slate-800 rounded-2xl p-3.5 mt-2 bg-[#1f2937] text-slate-100 outline-none focus:border-blue-500 transition-all placeholder:text-slate-500"
                placeholder="Link ..."
              />
            </div>
            <div>
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.15em]">
                GitHub
              </label>
              <input
                onChange={(e) => props.getGitHub(e.target.value)}
                value={props.resume.github}
                type="text"
                className="w-full border-2 border-slate-800 rounded-2xl p-3.5 mt-2 bg-[#1f2937] text-slate-100 outline-none focus:border-blue-500 transition-all placeholder:text-slate-500"
                placeholder="Link ..."
              />
            </div>
            <div>
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.15em]">
                Portfolio
              </label>
              <input
                onChange={(e) => props.getPartfolio(e.target.value)}
                value={props.resume.portfolio}
                type="text"
                className="w-full border-2 border-slate-800 rounded-2xl p-3.5 mt-2 bg-[#1f2937] text-slate-100 outline-none focus:border-blue-500 transition-all placeholder:text-slate-500"
                placeholder="Link ..."
              />
            </div>
            <div>
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.15em]">
                Address
              </label>
              <input
                onChange={(e) => props.getAddress(e.target.value)}
                value={props.resume.address}
                type="text"
                className="w-full border-2 border-slate-800 rounded-2xl p-3.5 mt-2 bg-[#1f2937] text-slate-100 outline-none focus:border-blue-500 transition-all placeholder:text-slate-500"
                placeholder="Shahar, tuman nomi"
              />
            </div>
            <div>
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.15em]">
                Job Title
              </label>
              <input
                onChange={(e) => props.getJobTitle(e.target.value)}
                value={props.resume.jobTitle}
                type="text"
                className="w-full border-2 border-slate-800 rounded-2xl p-3.5 mt-2 bg-[#1f2937] text-slate-100 outline-none focus:border-blue-500 transition-all placeholder:text-slate-500"
                placeholder="Frontend Developer"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.15em]">
              Summary (About Yourself)
            </label>
            <textarea
              onChange={(e) => props.getSummary(e.target.value)}
              value={props.resume.summary}
              className="w-full border-2 border-slate-800 rounded-2xl p-4 mt-2 bg-[#1f2937] text-slate-100 h-28 resize-none outline-none focus:border-blue-500 placeholder:text-slate-500"
              placeholder="O'zingiz haqingizda qisqacha ma'lumot..."
            ></textarea>
          </div>
        </section>

        {/* --- 2. EXPERIENCES --- */}
        <div className="mb-14 px-2">
          <div className="grid grid-cols-1 gap-4 w-full mt-6 mb-10">
            {props.resume.experiences.length > 0 ? (
              props.resume.experiences.map((itm: any, i: any) => (
                <div
                  key={i}
                  className="group relative flex items-center justify-between p-4 border-2 border-slate-800 rounded-2xl bg-[#111827] hover:border-blue-500/50 transition-all shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 font-black italic">
                      {itm.id}
                    </div>

                    <div className="text-left">
                      <h4 className="text-white font-bold text-[15px] leading-tight">
                        {itm.company}
                      </h4>
                      <p className="text-slate-400 text-xs font-medium mt-1 uppercase tracking-wider">
                        {itm.role} •{" "}
                        <span className="text-slate-500 italic">
                          {itm.startDate}-{itm.endDate}
                        </span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => props.ExpdelItem(itm.id)}
                    className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="O'chirish"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              ))
            ) : (
              <p className="text-slate-600 text-sm italic py-4">
                Hozircha tajribalar qo'shilmadi...
              </p>
            )}
          </div>
          <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] italic mb-4">
            Experiences
          </h3>
          <Drawer.Root>
            <Drawer.Trigger asChild>
              <button className="w-full border-2 border-dashed border-slate-800 rounded-4xl py-10 font-black text-slate-500 bg-[#111827]/50 hover:border-blue-500/50 transition-all flex items-center justify-center gap-3">
                <Plus size={20} /> Add New Item +
              </button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60" />
              <Drawer.Content className="bg-[#111827] flex flex-col rounded-t-4xl fixed bottom-0 left-0 right-0 border-t-2 border-slate-800 z-70 p-6 focus:outline-none max-h-[96vh]">
                <div className="max-w-md mx-auto w-full overflow-y-auto px-2">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800 text-white uppercase font-black text-xs tracking-widest italic">
                    <Briefcase size={18} className="text-blue-500" /> New
                    Experience
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase">
                          Company Name
                        </label>
                        <input
                          onChange={(e) => props.getCompany(e.target.value)}
                          value={props.resume.company}
                          type="text"
                          className="w-full border-2 border-slate-800 rounded-[14px] p-3 bg-[#1f2937] text-white outline-none placeholder:text-slate-500"
                          placeholder="Kompaniya nomi"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase">
                          Role
                        </label>
                        <input
                          onChange={(e) => props.getRole(e.target.value)}
                          value={props.resume.role}
                          type="text"
                          className="w-full border-2 border-slate-800 rounded-[14px] p-3 bg-[#1f2937] text-white outline-none placeholder:text-slate-500"
                          placeholder="Lavozimingiz"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase">
                        Location
                      </label>
                      <input
                        onChange={(e) => props.getLocation(e.target.value)}
                        value={props.resume.location}
                        type="text"
                        className="w-full border-2 border-slate-800 rounded-[14px] p-3 bg-[#1f2937] text-white outline-none placeholder:text-slate-500"
                        placeholder="Ish joyi manzili"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase">
                          Start Date
                        </label>
                        <input
                          onChange={(e) => props.getStartDate(e.target.value)}
                          value={props.resume.startDate}
                          type="date"
                          onClick={handleDateClick}
                          className="w-full border-2 border-slate-800 rounded-[14px] p-3 bg-[#1f2937] text-white outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase mr-30">
                          End Date
                        </label>
                        <input
                          onChange={(e) => {
                            setExpEndData(e.target.checked);
                            props.getEndDate("hozirda ham ishlayapti");
                          }}
                          checked={ExpEndData}
                          type="checkbox"
                        />

                        {ExpEndData ? (
                          <span className="text-sm text-green-500 font-bold">
                            Present
                          </span>
                        ) : (
                          <input
                            onChange={(e) => props.getEndDate(e.target.value)}
                            type={"date"}
                            value={props.resume.endDate}
                            onClick={handleDateClick}
                            className="w-full border-2 border-slate-800 rounded-[14px] p-3 bg-[#1f2937] text-white outline-none"
                          />
                        )}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase">
                        Description
                      </label>
                      <textarea
                        onChange={(e) => props.getDescription(e.target.value)}
                        value={props.resume.description}
                        className="w-full border-2 border-slate-800 rounded-[14px] p-3 bg-[#1f2937] h-32 outline-none resize-none placeholder:text-slate-500 text-white"
                        placeholder="Vazifalaringiz haqida..."
                      />
                    </div>
                  </div>
                  <Drawer.Close asChild>
                    <button
                      onClick={() => props.addExperience()}
                      className="w-full bg-white text-[#0a0f1a] py-4 mt-8 mb-4 rounded-2xl font-black uppercase shadow-[4px_4px_0px_0px_rgba(37,99,235,1)] active:shadow-none active:translate-y-1 transition-all"
                    >
                      Save
                    </button>
                  </Drawer.Close>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>

        {/* --- 3. PROJECTS --- */}
        <div className="mb-14 px-2">
          <div className="grid grid-cols-1 gap-4 w-full mt-6 mb-10">
            {props.resume.projects.length > 0 ? (
              props.resume.projects.map((itm: any, i: any) => (
                <div
                  key={i}
                  className="group relative flex items-center justify-between p-4 border-2 border-slate-800 rounded-2xl bg-[#111827] hover:border-blue-500/50 transition-all shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 font-black italic">
                      {itm.id}
                    </div>

                    <div className="text-left">
                      <h4 className="text-white font-bold text-[15px] leading-tight">
                        {itm.projectName}
                      </h4>
                      <p className="text-slate-400 text-xs font-medium mt-1 uppercase tracking-wider">
                        {itm.liveLink} •{" "}
                        <span className="text-slate-500 italic">
                          {itm.repoLink}
                        </span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => props.ProdelItem(itm.id)}
                    className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="O'chirish"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              ))
            ) : (
              <p className="text-slate-600 text-sm italic py-4">
                Hozircha tajribalar qo'shilmadi...
              </p>
            )}
          </div>
          <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] italic mb-4">
            Projects
          </h3>
          <Drawer.Root>
            <Drawer.Trigger asChild>
              <button className="w-full border-2 border-dashed border-slate-800 rounded-4xl py-10 font-black text-slate-500 bg-[#111827]/50 hover:border-blue-500/50 transition-all flex items-center justify-center gap-3">
                <Plus size={20} /> Add New Item +
              </button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60" />
              <Drawer.Content className="bg-[#111827] flex flex-col rounded-t-4xl fixed bottom-0 left-0 right-0 border-t-2 border-slate-800 z-70 p-6 focus:outline-none max-h-[96vh]">
                <div className="max-w-md mx-auto w-full overflow-y-auto px-2">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800 text-white uppercase font-black text-xs tracking-widest italic">
                    <LayoutGrid size={18} className="text-blue-500" /> New
                    Project
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase">
                        Project Name
                      </label>
                      <input
                        onChange={(e) => props.getProjectName(e.target.value)}
                        value={props.resume.projectName}
                        type="text"
                        className="w-full border-2 border-slate-800 rounded-[14px] p-3 bg-[#1f2937] text-white outline-none placeholder:text-slate-500"
                        placeholder="Loyiha nomi"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase">
                          Deployment link
                        </label>
                        <input
                          onChange={(e) => props.getLiveLink(e.target.value)}
                          value={props.resume.liveLink}
                          type="text"
                          className="w-full border-2 border-slate-800 rounded-[14px] p-3 bg-[#1f2937] text-white outline-none placeholder:text-slate-500"
                          placeholder="https://..."
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase">
                          Repository link
                        </label>
                        <input
                          onChange={(e) => props.getRepoLink(e.target.value)}
                          value={props.resume.repoLink}
                          type="text"
                          className="w-full border-2 border-slate-800 rounded-[14px] p-3 bg-[#1f2937] text-white outline-none placeholder:text-slate-500"
                          placeholder="GitHub link"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase">
                        Description
                      </label>
                      <textarea
                        onChange={(e) =>
                          props.getProjectDescription(e.target.value)
                        }
                        value={props.resume.projectDescription}
                        className="w-full border-2 border-slate-800 rounded-[14px] p-3 bg-[#1f2937] h-32 outline-none resize-none placeholder:text-slate-500 text-white"
                        placeholder="Loyiha tavsifi..."
                      />
                    </div>
                  </div>
                  <Drawer.Close asChild>
                    <button
                      onClick={() => props.addProject()}
                      className="w-full bg-white text-[#0a0f1a] py-4 mt-8 mb-4 rounded-2xl font-black uppercase shadow-[4px_4px_0px_0px_rgba(37,99,235,1)] active:shadow-none active:translate-y-1 transition-all"
                    >
                      Save
                    </button>
                  </Drawer.Close>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>

        {/* --- 4. EDUCATION --- */}
        <div className="mb-14 px-2">
          <div className="grid grid-cols-1 gap-4 w-full mt-6 mb-10">
            {props.resume.education.length > 0 ? (
              props.resume.education.map((itm: any, i: any) => (
                <div
                  key={i}
                  className="group relative flex items-center justify-between p-4 border-2 border-slate-800 rounded-2xl bg-[#111827] hover:border-blue-500/50 transition-all shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 font-black italic">
                      {itm.id}
                    </div>

                    <div className="text-left">
                      <h4 className="text-white font-bold text-[15px] leading-tight">
                        {itm.institution}
                      </h4>
                      <p className="text-slate-400 text-xs font-medium mt-1 uppercase tracking-wider">
                        {itm.degree} •{" "}
                        <span className="text-slate-500 italic">
                          {itm.startDate} - {itm.endDate}
                        </span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => props.EdudelItem(itm.id)}
                    className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="O'chirish"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              ))
            ) : (
              <p className="text-slate-600 text-sm italic py-4">
                Hozircha tajribalar qo'shilmadi...
              </p>
            )}
          </div>
          <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] italic mb-4">
            Education
          </h3>
          <Drawer.Root>
            <Drawer.Trigger asChild>
              <button className="w-full border-2 border-dashed border-slate-800 rounded-4xl py-10 font-black text-slate-500 bg-[#111827]/50 hover:border-blue-500/50 transition-all flex items-center justify-center gap-3">
                <Plus size={20} /> Add New Item +
              </button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60" />
              <Drawer.Content className="bg-[#111827] flex flex-col rounded-t-4xl fixed bottom-0 left-0 right-0 border-t-2 border-slate-800 z-70 p-6 focus:outline-none max-h-[96vh]">
                <div className="max-w-md mx-auto w-full overflow-y-auto px-2">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800 text-white uppercase font-black text-xs tracking-widest italic">
                    <GraduationCap size={18} className="text-blue-500" /> New
                    Education
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase">
                        Institution Name
                      </label>
                      <input
                        onChange={(e) => props.getInstitution(e.target.value)}
                        value={props.resume.institution}
                        type="text"
                        className="w-full border-2 border-slate-800 rounded-[14px] p-3 bg-[#1f2937] text-white outline-none placeholder:text-slate-500"
                        placeholder="O'quv maskani nomi"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase">
                          Degree
                        </label>
                        <input
                          onChange={(e) => props.getDegree(e.target.value)}
                          value={props.resume.degree}
                          type="text"
                          className="w-full border-2 border-slate-800 rounded-[14px] p-3 bg-[#1f2937] text-white outline-none placeholder:text-slate-500"
                          placeholder="Bakalavr / Kurs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase">
                          Field of Study
                        </label>
                        <input
                          onChange={(e) =>
                            props.getFieldOfStudy(e.target.value)
                          }
                          value={props.resume.fieldOfStudy}
                          type="text"
                          className="w-full border-2 border-slate-800 rounded-[14px] p-3 bg-[#1f2937] text-white outline-none placeholder:text-slate-500"
                          placeholder="Yo'nalish"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase">
                          Start date
                        </label>
                        <input
                          onChange={(e) =>
                            props.getEduStartDate(e.target.value)
                          }
                          value={props.resume.eduStartDate}
                          type="date"
                          onClick={handleDateClick}
                          className="w-full border-2 border-slate-800 rounded-[14px] p-3 bg-[#1f2937] text-white outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase">
                          End date
                        </label>
                        <input
                          onChange={(e) => {
                            setEduEndData(e.target.checked);
                            props.getEduEndDate("hozirda ham o'qiyapti");
                          }}
                          checked={EduEndData}
                          type="checkbox"
                        />

                        {!EduEndData ? (
                          <input
                            onChange={(e) =>
                              props.getEduEndDate(e.target.value)
                            }
                            type={"date"}
                            value={props.resume.eduEndDate}
                            onClick={handleDateClick}
                            className="w-full border-2 border-slate-800 rounded-[14px] p-3 bg-[#1f2937] text-white outline-none"
                          />
                        ) : (
                          <span className="text-sm text-green-500 font-bold">
                            Present
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase">
                        Description
                      </label>
                      <textarea
                        onChange={(e) =>
                          props.getEduDescription(e.target.value)
                        }
                        value={props.resume.eduDescription}
                        className="w-full border-2 border-slate-800 rounded-[14px] p-3 bg-[#1f2937] h-32 outline-none resize-none placeholder:text-slate-500 text-white"
                        placeholder="Qo'shimcha ma'lumot..."
                      />
                    </div>
                  </div>
                  <Drawer.Close asChild>
                    <button
                      onClick={() => props.addEducation()}
                      className="w-full bg-white text-[#0a0f1a] py-4 mt-8 mb-4 rounded-2xl font-black uppercase shadow-[4px_4px_0px_0px_rgba(37,99,235,1)] active:shadow-none active:translate-y-1 transition-all"
                    >
                      Save
                    </button>
                  </Drawer.Close>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>

        {/* --- 5. SKILLS --- */}
        <div className="mb-14 px-2">
          <div className="grid grid-cols-1 gap-4 w-full mt-6 mb-10">
            {props.resume.skills.length > 0 ? (
              props.resume.skills.map((itm: any, i: any) => (
                <div
                  key={i}
                  className="group relative flex items-center justify-between p-4 border-2 border-slate-800 rounded-2xl bg-[#111827] hover:border-blue-500/50 transition-all shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 font-black italic">
                      {itm.id}
                    </div>

                    <div className="text-left">
                      <h4 className="text-white font-bold text-[15px] leading-tight">
                        {itm.category}
                      </h4>
                      <p className="text-slate-400 text-xs font-medium mt-1 uppercase tracking-wider">
                        {itm.skillList}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => props.SkildelItem(itm.id)}
                    className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="O'chirish"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              ))
            ) : (
              <p className="text-slate-600 text-sm italic py-4">
                Hozircha tajribalar qo'shilmadi...
              </p>
            )}
          </div>
          <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] italic mb-4">
            Skills
          </h3>
          <Drawer.Root>
            <Drawer.Trigger asChild>
              <button className="w-full border-2 border-dashed border-slate-800 rounded-4xl py-10 font-black text-slate-500 bg-[#111827]/50 hover:border-blue-500/50 transition-all flex items-center justify-center gap-3">
                <Plus size={20} /> Add New Item +
              </button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60" />
              <Drawer.Content className="bg-[#111827] flex flex-col rounded-t-4xl fixed bottom-0 left-0 right-0 border-t-2 border-slate-800 z-70 p-6 focus:outline-none">
                <div className="max-w-md mx-auto w-full px-2">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800 text-white uppercase font-black text-xs tracking-widest italic">
                    <CodeXml size={18} className="text-blue-500" /> New Skill
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase">
                        Skill
                      </label>
                      <input
                        onChange={(e) => props.getSkillCategory(e.target.value)}
                        value={props.resume.skillCategory}
                        type="text"
                        className="w-full border-2 border-slate-800 rounded-[14px] p-3 bg-[#1f2937] text-white outline-none placeholder:text-slate-500"
                        placeholder="Masalan: Frontend"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase">
                        Skill List
                      </label>
                      <textarea
                        value={props.resume.skillList}
                        onChange={(e) => props.getSkillList(e.target.value)}
                        className="w-full border-2 border-slate-800 rounded-[14px] p-3 bg-[#1f2937] h-24 outline-none resize-none placeholder:text-slate-500 text-white"
                        placeholder="React, Next.js, Tailwind..."
                      />
                    </div>
                  </div>
                  <Drawer.Close asChild>
                    <button
                      onClick={() => props.addSkill()}
                      className="w-full bg-white text-[#0a0f1a] py-4 mt-8 mb-4 rounded-2xl font-black uppercase shadow-[4px_4px_0px_0px_rgba(37,99,235,1)] active:shadow-none active:translate-y-1 transition-all"
                    >
                      Save
                    </button>
                  </Drawer.Close>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>

        {/* --- 6. LANGUAGES --- */}
        <div className="mb-14 px-2">
          <div className="grid grid-cols-1 gap-4 w-full mt-6 mb-10">
            {props.resume.languages.length > 0 ? (
              props.resume.languages.map((itm: any, i: any) => (
                <div
                  key={i}
                  className="group relative flex items-center justify-between p-4 border-2 border-slate-800 rounded-2xl bg-[#111827] hover:border-blue-500/50 transition-all shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 font-black italic">
                      {itm.id}
                    </div>

                    <div className="text-left">
                      <h4 className="text-white font-bold text-[15px] leading-tight">
                        {itm.language}
                      </h4>
                      <p className="text-slate-400 text-xs font-medium mt-1 uppercase tracking-wider">
                        {itm.level}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => props.LandelItem(itm.id)}
                    className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="O'chirish"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              ))
            ) : (
              <p className="text-slate-600 text-sm italic py-4">
                Hozircha tajribalar qo'shilmadi...
              </p>
            )}
          </div>
          <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] italic mb-4">
            Languages
          </h3>
          <Drawer.Root>
            <Drawer.Trigger asChild>
              <button className="w-full border-2 border-dashed border-slate-800 rounded-4xl py-10 font-black text-slate-500 bg-[#111827]/50 hover:border-blue-500/50 transition-all flex items-center justify-center gap-3">
                <Plus size={20} /> Add New Item +
              </button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60" />
              <Drawer.Content className="bg-[#111827] flex flex-col rounded-t-4xl fixed bottom-0 left-0 right-0 border-t-2 border-slate-800 z-70 p-6 focus:outline-none">
                <div className="max-w-md mx-auto w-full px-2">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800 text-white uppercase font-black text-xs tracking-widest italic">
                    <Languages size={18} className="text-blue-500" /> New
                    Language
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase">
                        Language
                      </label>
                      <input
                        onChange={(e) => props.getLanguageName(e.target.value)}
                        value={props.resume.language}
                        type="text"
                        className="w-full border-2 border-slate-800 rounded-[14px] p-3 bg-[#1f2937] text-white outline-none placeholder:text-slate-500"
                        placeholder="Til nomi"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase">
                        Level
                      </label>
                      <input
                        onChange={(e) => props.getLanguageLevel(e.target.value)}
                        value={props.resume.level}
                        type="text"
                        className="w-full border-2 border-slate-800 rounded-[14px] p-3 bg-[#1f2937] text-white outline-none placeholder:text-slate-500"
                        placeholder="Daraja (B2, IELTS...)"
                      />
                    </div>
                  </div>
                  <Drawer.Close asChild>
                    <button
                      onClick={() => props.addLanguage()}
                      className="w-full bg-white text-[#0a0f1a] py-4 mt-8 mb-4 rounded-2xl font-black uppercase shadow-[4px_4px_0px_0px_rgba(37,99,235,1)] active:shadow-none active:translate-y-1 transition-all"
                    >
                      Save
                    </button>
                  </Drawer.Close>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>

        {/* --- BOTTOM BUTTONS --- */}
        <div className="mt-20 flex gap-4 pt-10 border-t-2 border-slate-800">
          <button
            onClick={handleSave}
            className="flex-1 py-4 border-2 border-slate-800 rounded-2xl font-black uppercase text-slate-500 hover:bg-slate-900 transition-all"
          >
            Save
          </button>

            <button onClick={()=>navigate(`/resume/${userId}`)} className="flex-2 py-4 bg-blue-600 text-white border-2 border-blue-400 rounded-2xl font-black uppercase shadow-[0_10px_30px_rgba(37,99,235,0.4)] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              Check Resume <Eye size={18} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default connect((state: any) => {
  return { ...state.crud };
}, actions)(ResumeBuilder);
