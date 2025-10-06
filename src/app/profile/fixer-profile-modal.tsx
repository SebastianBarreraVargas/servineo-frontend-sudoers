import React from 'react';
import { User, Star } from 'lucide-react';
import Modal from './modal-window';
import { useProfile } from './hooks/useProfile';

type FixerProfileProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function FixerProfile({ isOpen, onClose }: FixerProfileProps) {
  const { data } = useProfile();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-[20rem] md:w-[40rem] md:min-w-[30rem] mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-200 text-black">
        <h2 className="text-lg font-semibold uppercase tracking-wide mb-4">Perfil del Fixer</h2>
        <div className="md:flex md:flex-row-reverse justify-between w-full">
          <div className="flex flex-col items-center">
            {!data ? (
              <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center mb-4">
                <User className="w-12 h-12 " />
              </div>
            ) : (
              // <div className="w-24 h-24 rounded-full border object-cover">
              <img
                src={data.photo_url}
                alt={data.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              // </div>
            )}
            <div className="flex gap-2 mb-4">
              {[1, 2, 3].map((star) => (
                <Star key={star} className="w-6 h-6 " />
              ))}
            </div>

            <button className="px-4 py-2 text-xs font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              VER DETALLES DE CALIFICACIONES
            </button>
          </div>
          <div className="mb-3 md:mr-5 md:w-[60%] mt-3">
            <div className="flex items-baseline gap-2">
              <span className="md:text-sm font-medium text-xs">Nombre:</span>
              <span className="md:text-base font-semibold text-sm">{data?.name}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="md:text-sm font-medium text-xs">Rol:</span>
              <span className="md:text-base font-semibold text-sm">{data?.role}</span>
            </div>

            <div className="flex flex-col justify-center items-center md:block mt-4">
              <h3 className="text-sm font-semibold mb-1">CALIFICACIONES</h3>

              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3].map((star) =>
                  data?.average_rating && data.average_rating >= star ? (
                    <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ) : (
                    <Star key={star} className="w-5 h-5" />
                  ),
                )}
              </div>
            </div>

            <div className="space-y-3">
              {[3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-3">
                  <span className="text-xs w-20">
                    {rating} {rating === 1 ? 'ESTRELLA' : 'ESTRELLAS'}
                  </span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    {data ? (
                      <div
                        className="h-full bg-black rounded-full transition-all duration-300"
                        style={{ width: `${data?.ratings[rating as 1 | 2 | 3]}%` }}
                      />
                    ) : (
                      <div
                        className="h-full bg-black rounded-full transition-all duration-300"
                        style={{ width: `0%` }}
                      />
                    )}
                  </div>
                  <span className="text-xs font-medium w-8">
                    {data?.ratings[rating as 1 | 2 | 3]}%
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-1">
              <p className="text-xs ">
                PROMEDIO DE CALIFICACIONES{' '}
                <span className="font-bold ">{data?.average_rating}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="md:flex md:justify-end">
          <button
            onClick={() => {
              onClose();
            }}
            className="w-full md:w-32 py-3 px-6 cursor-pointer bg-black text-white font-medium rounded-lg hover:bg-black/90 transition-colors"
          >
            Aceptar
          </button>
        </div>
      </div>
    </Modal>
  );
}
