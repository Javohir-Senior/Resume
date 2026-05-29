import { Plus, Bell, Search, LayoutGrid, LogOut, X, Menu } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetResumeIdQuery } from "./utils/query";
import { useState } from "react";

const Orders = () => {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  
  const { data, isLoading } = useGetResumeIdQuery(Number(id), {
    refetchOnMountOrArgChange: true,
  });

  const navigate = useNavigate();

  function goresume(id: number) {
    navigate(`/resume2/${id}`);
  }

  const filteredData = data?.filter((item: any) => 
    item.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#020617] p-3 sm:p-6 text-slate-200 font-sans">
      <nav className="w-full h-auto sm:h-16 bg-slate-900/50 border border-slate-800 rounded-xl mb-4 sm:mb-6 px-3 sm:px-6 py-3 sm:py-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 backdrop-blur-md shadow-lg">
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <LayoutGrid size={18} className="text-white" />
            </div>
            <span className="font-bold tracking-tight text-lg bg-linear-to-r from-white to-slate-400 bg-clip-text text-transparent hidden sm:inline">
              Data System
            </span>
          </div>
          <div className="sm:hidden flex items-center gap-2">
            <button 
              onClick={() => setShowSearch(!showSearch)}
              className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors"
            >
              {showSearch ? <X size={20} /> : <Search size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        {showSearch && (
          <div className="w-full sm:hidden flex items-center bg-slate-950/50 border border-slate-800 rounded-lg px-3 py-2 gap-2 mb-2">
            <Search size={16} className="text-slate-500 flex-shrink-0" />
            <input
              type="text"
              placeholder="Qidiruv..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none text-sm w-full placeholder:text-slate-600"
              autoFocus
            />
          </div>
        )}

        <div className="w-full sm:w-auto flex items-center gap-2 sm:gap-4 justify-end">
          {/* Desktop search */}
          <div className="hidden md:flex items-center bg-slate-950/50 border border-slate-800 rounded-lg px-3 py-1.5 gap-2">
            <Search size={16} className="text-slate-500 flex-shrink-0" />
            <input
              type="text"
              placeholder="Qidiruv..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none text-sm w-40 placeholder:text-slate-600"
            />
          </div>

          {/* Tablet search - visible on sm/md only */}
          <div className="md:hidden sm:flex hidden items-center bg-slate-950/50 border border-slate-800 rounded-lg px-2 py-1.5 gap-1">
            <Search size={14} className="text-slate-500 flex-shrink-0" />
            <input
              type="text"
              placeholder="Qidiruv..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none text-xs w-20 placeholder:text-slate-600"
            />
          </div>

          <button className="p-1.5 sm:p-2 hover:bg-slate-800 rounded-full transition-colors relative flex-shrink-0">
            <Bell size={18} className="sm:w-5 sm:h-5 text-slate-400" />
            <span className="absolute top-1 right-1 sm:top-2 sm:right-2 w-2 h-2 bg-blue-500 rounded-full border border-slate-900"></span>
          </button>

          <div className="h-6 sm:h-8 w-px bg-slate-800 mx-1"></div>

          <div className="relative">
            <button 
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 pl-1 sm:pl-2 hover:bg-slate-800 rounded-lg transition-colors p-1 flex-shrink-0"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 border border-slate-700"></div>
            </button>
            
            {showProfile && (
              <div className="absolute right-0 mt-2 w-40 bg-slate-900 border border-slate-800 rounded-lg shadow-xl z-50">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border-b border-slate-800"
                >
                  <LogOut size={16} />
                  <span>Chiqish</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="w-full min-h-screen sm:min-h-125 bg-slate-900/30 border border-slate-800 rounded-2xl sm:rounded-4xl p-3 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-wrap gap-2 sm:gap-4">
          <button 
            onClick={() => navigate("/resumebuilder")} 
            className="group relative w-24 h-20 sm:w-32 sm:h-24 border-2 border-dashed border-slate-700 hover:border-blue-500 hover:bg-blue-500/5 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 active:scale-95 shadow-sm"
          >
            <Plus
              size={24}
              className="sm:w-8 sm:h-8 text-slate-500 group-hover:text-blue-400 transition-colors"
              strokeWidth={2.5}
            />
          </button>

          {/* Filtered rezyumelar ro'yxati */}
          {filteredData && filteredData.length > 0 ? (
            filteredData.map((itm: any) => (
              <button
                onClick={() => goresume(itm.id)}
                key={itm.id}
                className="group relative w-24 h-20 sm:w-32 sm:h-24 border border-slate-700 bg-slate-900/50 hover:border-blue-500 hover:bg-slate-800 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center transition-all duration-300 active:scale-95 shadow-lg overflow-hidden p-2 text-center"
              >
                <div className="text-[10px] sm:text-xs font-bold text-slate-300 group-hover:text-white truncate w-full">
                  {itm.fullName || "Ismsiz"}
                </div>
                <div className="text-[8px] sm:text-[10px] text-slate-500 mt-0.5 sm:mt-1 uppercase tracking-tighter">
                  {itm.jobTitle || "Rezyume"}
                </div>
                <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            ))
          ) : (
            !isLoading && <p className="text-slate-500 flex items-center h-20 sm:h-24 text-sm sm:text-base">{searchTerm ? "Hech qanday natija topilmadi" : "Hozircha rezyumelar yo'q"}</p>
          )}

          {isLoading && <div className="text-blue-500 animate-pulse h-20 sm:h-24 flex items-center text-sm sm:text-base">Yuklanmoqda...</div>}
        </div>

        {/* Orqa fon effektlari */}
        <div
          className="absolute inset-0 z-[-1] opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        ></div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.01] select-none text-6xl sm:text-[120px] font-black tracking-tighter uppercase">
          Workspace
        </div>
      </main>
    </div>
  );
};

export default Orders;