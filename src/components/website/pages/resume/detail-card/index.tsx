import React from 'react';

interface DetailCardProps {
  date: string;
  title: string;
  place: string;
}

const DetailCard: React.FC<DetailCardProps> = ({ date, title, place }) => {
  return (
    <div className="rounded-xl bg-card py-6 px-3 shadow-sm">
      <p className="para-2 font-semibold text-muted">{date}</p>
      <p className="para-1 font-bold">{title}</p>
      <p className="para-1 font-semibold">{place}</p>
    </div>
  );
};

export default DetailCard;
