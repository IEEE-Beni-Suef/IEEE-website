interface AuthIllustrationProps {
  type: "login" | "register";
  className?: string;
}

export const AuthIllustration = ({
  type,
  className = "",
}: AuthIllustrationProps) => {
  if (type === "login") {
    return (
      <div className={`relative ${className}`}>
        <div className="relative z-10">
          {/* Login Illustration */}
          <svg
            viewBox="0 0 400 300"
            className="w-full h-auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background */}
            <defs>
              <linearGradient
                id="loginGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#3B82F6", stopOpacity: 0.1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#1D4ED8", stopOpacity: 0.2 }}
                />
              </linearGradient>
            </defs>
            <rect width="400" height="300" fill="url(#loginGradient)" rx="20" />

            {/* Person */}
            <ellipse
              cx="200"
              cy="120"
              rx="25"
              ry="30"
              fill="#3B82F6"
              opacity="0.8"
            />
            <circle cx="200" cy="90" r="20" fill="#3B82F6" />

            {/* Computer/Screen */}
            <rect
              x="155"
              y="165"
              width="90"
              height="50"
              rx="4"
              fill="#3B82F6"
              opacity="0.3"
            />
            <rect
              x="160"
              y="175"
              width="80"
              height="3"
              rx="1.5"
              fill="#3B82F6"
            />
            <rect
              x="160"
              y="185"
              width="60"
              height="3"
              rx="1.5"
              fill="#3B82F6"
            />
            <rect
              x="160"
              y="195"
              width="70"
              height="3"
              rx="1.5"
              fill="#3B82F6"
            />

            {/* Decorative Elements */}
            <circle cx="100" cy="50" r="15" fill="#3B82F6" opacity="0.2" />
            <circle cx="320" cy="80" r="10" fill="#1D4ED8" opacity="0.3" />
            <circle cx="80" cy="200" r="8" fill="#3B82F6" opacity="0.4" />
            <circle cx="350" cy="220" r="12" fill="#1D4ED8" opacity="0.2" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-lg -z-10"></div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div className="relative z-10">
        {/* Register Illustration */}
        <svg
          viewBox="0 0 400 300"
          className="w-full h-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background */}
          <defs>
            <linearGradient
              id="registerGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "#3B82F6", stopOpacity: 0.1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#1D4ED8", stopOpacity: 0.2 }}
              />
            </linearGradient>
          </defs>
          <rect
            width="400"
            height="300"
            fill="url(#registerGradient)"
            rx="20"
          />

          {/* Multiple People */}
          <ellipse
            cx="150"
            cy="120"
            rx="20"
            ry="25"
            fill="#3B82F6"
            opacity="0.8"
          />
          <circle cx="150" cy="95" r="15" fill="#3B82F6" />

          <ellipse
            cx="200"
            cy="130"
            rx="20"
            ry="25"
            fill="#1D4ED8"
            opacity="0.8"
          />
          <circle cx="200" cy="105" r="15" fill="#1D4ED8" />

          <ellipse
            cx="250"
            cy="125"
            rx="20"
            ry="25"
            fill="#3B82F6"
            opacity="0.8"
          />
          <circle cx="250" cy="100" r="15" fill="#3B82F6" />

          {/* Form/Document */}
          <rect
            x="100"
            y="170"
            width="200"
            height="80"
            rx="8"
            fill="#FFFFFF"
            stroke="#E5E7EB"
            strokeWidth="2"
          />
          <rect x="110" y="185" width="60" height="3" rx="1.5" fill="#3B82F6" />
          <rect x="110" y="195" width="80" height="3" rx="1.5" fill="#D1D5DB" />
          <rect x="110" y="205" width="70" height="3" rx="1.5" fill="#D1D5DB" />
          <rect x="110" y="220" width="90" height="3" rx="1.5" fill="#D1D5DB" />
          <rect x="110" y="230" width="60" height="3" rx="1.5" fill="#D1D5DB" />

          {/* Checkmark */}
          <circle cx="270" cy="195" r="12" fill="#3B82F6" />
          <path
            d="M265 195 L268 198 L275 190"
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Decorative Elements */}
          <circle cx="80" cy="60" r="12" fill="#3B82F6" opacity="0.3" />
          <circle cx="330" cy="70" r="8" fill="#1D4ED8" opacity="0.4" />
          <circle cx="60" cy="180" r="6" fill="#3B82F6" opacity="0.5" />
          <circle cx="360" cy="200" r="10" fill="#1D4ED8" opacity="0.3" />
        </svg>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 rounded-lg -z-10"></div>
    </div>
  );
};
