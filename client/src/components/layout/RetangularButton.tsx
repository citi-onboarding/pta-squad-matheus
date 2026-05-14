import Image from "next/image";

interface RetangularButtonProps {
    text?: string;
    backgroundColor?: string;
    textColor?: string;
    srcImage?: string;
    onClick?: () => void;
}

export default function RetangularButton({
    text = "botao", 
    backgroundColor = "bg-emerald-500",
    textColor = "text-white",
    srcImage = "/img/icon-192.png",
    onClick}:
    RetangularButtonProps){
    return (
        <button className={`flex items-center 
                            gap-2 px-5 py-2 
                            ${backgroundColor} ${textColor}
                            rounded-md 
                            hover:opacity-50`}
                onClick={onClick}>
            <Image src={srcImage} alt="Icone do botão" width={17} height={17}/>
            {text} 
        </button>
    )
}