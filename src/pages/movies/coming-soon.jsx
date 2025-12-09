import React from "react";
import { useRouter } from "next/router";

const ComingSoonPage = () => {
  const router = useRouter();
  const { name } = router.query;

  // Convert 'battle-of-galwan' → 'Battle Of Galwan'
  const formattedName = name
    ? name
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "Movie";

  return (
    <div className="coming-soon-container">
      <h1 className="movie-title">{formattedName}</h1>
      <p className="coming-text">COMING SOON</p>
      <style jsx>{`
        .coming-soon-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100%;
          color: #1d1d1d;
          text-align: center;
          padding: 20px;
          font-family: var(--primary-font);
        }

        .movie-title {
          font-size: 5vw;
          font-weight: bold;
          margin: 0;
        }

        .coming-text {
          font-size: 3vw;
        }

        .message-text {
          font-size: 1.5vw;
          margin-top: 20px;
        }

        @media (max-width: 768px) {
          .movie-title {
            font-size: 10vw;
          }
          .coming-text {
            font-size: 6vw;
          }
          .message-text {
            font-size: 4vw;
          }
        }
      `}</style>
    </div>
  );
};

export default ComingSoonPage;
