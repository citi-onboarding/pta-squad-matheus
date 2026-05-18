import Image from "next/image";

interface RetangularButtonProps {
    className?: string;
    text?: string;
    backgroundColor?: string;
    textColor?: string;
    srcImage?: string;
    onClick?: () => void;
}

export default function RetangularButton({
    className = "",
    text = "botao", 
    backgroundColor = "bg-brand-green",
    textColor = "text-white",
    srcImage = "/img/icon-192.png",
    onClick}:
    RetangularButtonProps){
    return (
        <button className={`flex justify-center
                            gap-1 px-2 py-2 
                            ${backgroundColor} ${textColor}
                            rounded-md 
                            hover:opacity-50 ${className}`}
                onClick={onClick}>
            <div className="flex items-center gap-1">
                <Image src={srcImage} alt="Icone do botão" width={17} height={17} className="w-17 h-17"/>
                <p className="hidden md:block">{text}</p>
            </div>
        </button>
    )
}