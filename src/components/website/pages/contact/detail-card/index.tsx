import React from 'react';

interface DetailCardProps {
  icon?: React.ReactNode;
  title?: string;
  details?: string[];
}

const DetailCard: React.FC<DetailCardProps> = ({
  icon = null,
  title = '',
  details = [],
}) => {
  const isEmail = title === 'Email';

  return (
    <div className="flex-[47.5%] w-full px-4 py-5 bg-card even:bg-tertiary-2 even:dark:bg-secondary rounded-2xl flex gap-3 items-start">
      <div className="mt-0.5">{icon}</div>
      <div>
        <p className="para-1 font-bold mb-1">{title}:</p>
        {details.map((detail, index) =>
          isEmail ? (
            <a
              key={index}
              href={`mailto:${detail}`}
              className="para-2 font-semibold hover:underline transition-colors block"
            >
              {detail}
            </a>
          ) : (
            <p key={index} className="para-2 font-semibold">
              {detail}
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default DetailCard;
