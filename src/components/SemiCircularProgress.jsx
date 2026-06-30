const SemiCircularProgress = ({ value = 80 }) => {
  const totalBars = 24;
  const activeBars = Math.round((value / 100) * totalBars);

  return (
    <div className="relative w-[220px] h-[120px] flex items-end justify-center">
      {/* Segments */}
      <div className="absolute inset-0">
        {[...Array(totalBars)].map((_, index) => {
          const angle = -90 + (180 / (totalBars - 1)) * index;

          return (
            <div
              key={index}
              className={`absolute left-1/2 bottom-0 origin-bottom ${
                index < activeBars ? "bg-blue-500" : "bg-gray-300"
              }`}
              style={{
                width: "8px",
                height: "28px",
                borderRadius: "999px",
                transform: `translateX(-50%) rotate(${angle}deg) translateY(-85px)`,
              }}
            />
          );
        })}
      </div>

      {/* Inner Dashed Arc */}
      <div className="absolute bottom-0 w-[140px] h-[70px] border-t-2 border-dashed border-[#BCC1D1] rounded-t-full" />

      {/* Text */}
      <div className="absolute bottom-0 text-center">
        <div className="text-2xl font-semibold text-[#334155]">{value}%</div>
        <div className="text-sm font-bold text-[#5E5873]">
          Discussions
        </div>
      </div>
    </div>
  );
};

export default SemiCircularProgress;
