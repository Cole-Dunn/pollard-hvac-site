interface LogoProps {
  className?: string;
}

export function Logo({ className = "w-10 h-10" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg">
      {/* Red flame */}
      <path 
        d="M15 35 Q10 25 15 15 Q20 10 25 15 Q30 25 25 35 Q20 40 15 35 Z" 
        fill="#DC3545"
      />
      {/* Blue snowflake */}
      <g fill="#0D6EFD">
        <circle cx="55" cy="20" r="2"/>
        <rect x="54" y="10" width="2" height="20"/>
        <rect x="45" y="19" width="20" height="2"/>
        <rect x="48" y="13" width="14" height="2" transform="rotate(45 55 20)"/>
        <rect x="48" y="25" width="14" height="2" transform="rotate(-45 55 20)"/>
      </g>
    </svg>
  );
}
