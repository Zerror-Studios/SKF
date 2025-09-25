import React from "react";

const FilmographySection = () => {
  const filmography = [
    {
      year: 2011,
      title: "Chillar Party (SKF co-produced)",
      directors: ["Nitesh Tiwari", "Vikas Bahl"],
    },
    {
      year: 2014,
      title: "Dr. Cabbie",
      directors: ["Jean-francois Pouliot"],
    },
    {
      year: 2015,
      title: "Bajrangi Bhaijaan",
      directors: ["Kabir Khan"],
    },
    {
      year: 2015,
      title: "Hero",
      directors: ["Nikhil Advani"],
    },
    {
      year: 2017,
      title: "Tubelight",
      directors: ["Kabir Khan"],
    },
    {
      year: 2018,
      title: "Race 3",
      directors: ["Remo D’Souza"],
    },
    {
      year: 2019,
      title: "Love Yatri",
      directors: ["Abhiraj Minawala"],
    },
  ];

  return (
    <div id="filmography_section">
      <h2 className="heading">Filmography</h2>
      <div id="filmography_cards_wrap">
        {filmography.map((film, index) => (
          <div className="filmography_card" key={index}>
            <div className="filmo_year">
              <h4 className="heading">{film.year}</h4>
            </div>
            <div className="filmo_info">
              <p className="description">{film.title}</p>
              <div className="filmo_director">
                <h5>Director</h5>
                <p className="description">{film.directors.join(", ")}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilmographySection;
