import { useState } from "react";
import { Phone, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "./utils/query";

const Auth = () => {
  const [show, setShow] = useState(false);
  const { data } = useGetUsersQuery("/users");
  const navigate = useNavigate();
  const [tel, setTel] = useState("");
  const [cod, setCod] = useState("");

  function singin() {
    const user = data?.find((u: any) => u.phone === tel && u.password === cod);

    if (user) {
      localStorage.setItem("userId", user.id);
      navigate(`/orders/${user.id}`);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] p-4 text-slate-200">
      <div className="w-full max-w-90 p-6 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm shadow-xl">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Control Panel
          </h2>
          <p className="text-slate-500 text-[12px] mt-1 font-medium">
            Tizimga kirish
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 ml-1">
              Telefon
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                <Phone size={16} />
              </div>
              <input
                onChange={(e) => setTel(e.target.value)}
                type="text"
                placeholder="+998"
                className="w-full bg-slate-950/40 border border-slate-800 rounded-lg py-2.5 pl-9 pr-4 text-sm outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all placeholder:text-slate-700"
              />
            </div>
          </div>


          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                Parol
              </label>
              <span className="text-[10px] text-blue-500 hover:text-blue-400 cursor-pointer font-medium">
                Unutdingizmi?
              </span>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                <Lock size={16} />
              </div>
              <input
                onChange={(e) => setCod(e.target.value)}
                type={show ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-slate-950/40 border border-slate-800 rounded-lg py-2.5 pl-9 pr-10 text-sm outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all placeholder:text-slate-700"
              />
              <button
                onClick={() => setShow(!show)}
                className="absolute inset-y-0 right-3 flex items-center text-slate-600 hover:text-slate-400"
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>


          <button
            onClick={() => singin()}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold py-2.5 rounded-lg transition-all active:scale-[0.97] mt-2 shadow-lg shadow-blue-900/20"
          >
            <span>KIRISH</span>
            <ArrowRight size={16} />
          </button>
        </div>


        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800/60"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold">
            <span className="px-2 bg-[#0c1326] text-slate-600">Yoki</span>
          </div>
        </div>


          <button onClick={()=>navigate("/register")} className="w-full py-2 rounded-lg border border-slate-800 text-slate-400 text-[12px] font-medium hover:bg-slate-800/50 hover:text-slate-200 transition-all">
            Ro'yxatdan o'tish
          </button>
      </div>
    </div>
  );
};

export default Auth;
