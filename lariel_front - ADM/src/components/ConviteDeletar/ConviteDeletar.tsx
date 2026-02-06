export default function ConviteDELETAR({open,  onClose, children, }: {open: boolean; onClose: () => void; children: React.ReactNode; }){
    return(
        <div className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-black/80" : "invisible"}`} onClick={onClose}>
           <div className={`bg-white text-[var(--color-font-black)] rounded-lg shadow p-6 transtion-all mas-w-md ${open ? "scale-100 opacity-100": "scale-110 opacity-0"}`} onClick={(e) => e.stopPropagation}>
            <button className="absolute top-2 right-2 text-[var(--color-font-black)]hover:text-gray-700" onClick={onClose}>X</button> {children}
           </div>
        </div>
    );
} 