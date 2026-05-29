import { useState } from "react";
import { Phone, Lock, User, Eye, EyeOff, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { actions } from "./utils/redux";
import { useSaveUserMutation } from "./utils/query";

const Register = (props: any) => {
  const [show, setShow] = useState(false);
  const [saveUser] = useSaveUserMutation();
  const navigate =useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] p-4 text-slate-200">
      <div className="w-full max-w-90 p-6 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm shadow-xl">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            New Account
          </h2>
          <p className="text-slate-500 text-[12px] mt-1 font-medium">
            Ro'yxatdan o'tish
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 ml-1">
              To'liq ism
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                <User size={16} />
              </div>
              <input
                onChange={(e: any) => props.getName(e.target.value)}
                type="text"
                placeholder="Ismingizni kiriting"
                className="w-full bg-slate-950/40 border border-slate-800 rounded-lg py-2.5 pl-9 pr-4 text-sm outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all placeholder:text-slate-700"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 ml-1">
              Telefon
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                <Phone size={16} />
              </div>
              <input
                onChange={(e: any) => props.getPhone(e.target.value)}
                type="text"
                placeholder="+998"
                className="w-full bg-slate-950/40 border border-slate-800 rounded-lg py-2.5 pl-9 pr-4 text-sm outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all placeholder:text-slate-700"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 ml-1">
              Parol o'rnatish
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                <Lock size={16} />
              </div>
              <input
                onChange={(e: any) => props.getPass(e.target.value)}
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
              onClick={() => {
                saveUser(props.user)
                navigate("/")
              }}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold py-2.5 rounded-lg transition-all active:scale-[0.97] mt-4 shadow-lg shadow-blue-900/20"
            >
              <UserPlus size={16} />
              <span>RO'YXATDAN O'TISH</span>
            </button>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800/60 text-center">
          <p className="text-[12px] text-slate-500">
            Akkauntingiz bormi?{" "}
              <span onClick={()=>navigate("/")} className="text-blue-500 font-bold hover:text-blue-400 transition-colors">
                Kirish
              </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default connect((state: any) => {
  return { ...state.crud };
}, actions)(Register);
