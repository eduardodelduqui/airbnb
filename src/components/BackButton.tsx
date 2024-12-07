'use client'; // Indica que este é um componente Client-side

import { useRouter } from 'next/navigation'; // Atualizado para 'next/navigation'

const BackButton = ({ fallback = '/' }: { fallback?: string }) => {
  const router = useRouter();

  const handleGoBack = () => {
    if (document.referrer) {
      router.back(); // Volta para a página anterior
    } else {
      router.push(fallback); // Vai para a rota fallback (padrão "/")
    }
  };

  return (
    <button
      onClick={handleGoBack}
      className="flex justify-center items-center w-full h-full bg-white"
    >
      <img src="/icons/arrow-prev.svg" alt="" className="w-4 h-4" />
    </button>
  );
};

export default BackButton;
