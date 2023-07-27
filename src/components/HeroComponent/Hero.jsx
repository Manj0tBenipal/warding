import React, { useState, useEffect } from "react";
import data from "./backupData.json";
import "./hero.css";
import {
  FaCalendar,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaPlayCircle,
  
} from "react-icons/fa";

export default function Hero() {
  const [topAnime, setTopAnime] = useState([]);
  const heroSlide = topAnime.map((item, idx) => {
    return (
      <div
        key={item.mal_id}
        className={`carousel-item ${idx === 0 ? "active" : ""}`}
        data-bs-interval="3000"
      >
        <div className="anime-info">
          <div className="anime-info-content">
            <span className="rank">#{idx + 1} Spotlight</span>
            <h1 className="anime-title">{item.title_english || item.title}</h1>
            <div className="anime-statistics">
              <span className="anime-st-item">
                <FaPlayCircle size={14} />
                {item.type}
              </span>
              <span className="anime-st-item">
                <FaClock size={14} />
                {item.type === "TV"
                  ? item.duration.slice(0, 2) + "min"
                  : item.duration.slice(0, 7) + "min"}
              </span>

              <span className="anime-st-item">
                <FaCalendar size={13} /> {item.aired.string}
              </span>
              <span className="anime-st-item">
                <span className="quality">HD</span>
                <span className="episode-count">CC:{item.episodes}</span>
              </span>
            </div>
            <p className="description">
              {(item.background && item.background.slice(0, 360) + "...") ||
                (item.synopsis && item.synopsis.slice(0, 360) + "...")}
            </p>
            <div className="button-wrapper">
              <button className="watch-button hero-button">
                {" "}
                <FaPlayCircle size={12} /> Watch Now
              </button>
              <button className="details-button hero-button">
                Details <FaChevronRight size={12} />
              </button>
            </div>
          </div>
        </div>
        <img
          className="carousel-img"
          src={item.images.jpg.large_image_url}
          alt={item.title}
        />
      </div>
    );
  });

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://api.jikan.moe/v4/top/anime";

      try {
        const response = await fetch(url);
        const result = await response.json();
        setTopAnime(result.data || data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div
      id="carouselExampleAutoplaying"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">{heroSlide}</div>
      <div className="carousel-controls-wrapper">
        <button
          class="carousel-controls carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <FaChevronLeft size={15} />
        </button>
        <button
          class="carousel-controls carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <FaChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
