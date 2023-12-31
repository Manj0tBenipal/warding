import React, { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import "./AnimeInfo.css";
import { Link, useParams } from "react-router-dom";
import { FaEye, FaHeart, FaMedal, FaPlayCircle, FaPlus } from "react-icons/fa";
import Share from "../Share/Share";
import { useGetAnimeByMalId } from "../../hooks/useJikan";

export default function Details() {
  const params = useParams();
  const { data, isLoading } = useGetAnimeByMalId(params.id);
  const animeObj = data?.data;
  const [descIsCollapsed, setDescIsCollapsed] = useState(true);
  const genre = animeObj?.genres.map((genre) => {
    return (
      <Link
        className="genre-button"
        to={`/grid/genre?id=${genre.mal_id}&name=${genre.name}`}
      >
        {genre.name}
      </Link>
    );
  });

  const licensors = animeObj?.licensors?.map((licensor) => {
    return (
      <Link to={`/grid/${licensor.mal_id}/${licensor.name}`}>
        {licensor.name + ", "}
      </Link>
    );
  });

  const producers = animeObj?.producers?.map((producer) => {
    return (
      <Link to={`/grid/${producer.mal_id}/${producer.name}`}>
        {producer.name + ", "}
      </Link>
    );
  });

  const studios = animeObj?.studios?.map((studio) => {
    return (
      <Link to={`/grid/${studio.mal_id}/${studio.name}`}>
        {studio.name + ", "}
      </Link>
    );
  });

  const synonyms = animeObj?.title_synonyms?.map((title) => (
    <span key={title}>{title},</span>
  ));

  return !isLoading ? (
    <div className="details-container">
      <div className="details-header">
        <div className="details-header-primary">
          <img
            className="details-container-background"
            src={
              animeObj.images.webp.image_url ||
              animeObj.images.webp.large_image_url ||
              animeObj.images.webp.large_small_url ||
              animeObj.images.jpg.large_image_url ||
              "NA"
            }
          />
          <div className="anime-details d-flex">
            <img
              className="anime-details-poster"
              src={
                animeObj.images.webp.image_url ||
                animeObj.images.webp.large_image_url ||
                animeObj.images.webp.large_small_url
              }
            />

            <div className="anime-details-content d-flex-fd-column">
              <h1 className="title-large">
                {animeObj.title || animeObj.title_english}
              </h1>
              <div className="anime-statistics-tiles-wrapper d-flex a-center">
                <span className="anime-statistics-tile d-flex a-center j-center">
                  {animeObj.rating || "NA"}
                </span>
                <span className="anime-statistics-tile d-flex a-center j-center">
                  <FaMedal /> - {animeObj.rank || "NA"}
                </span>
                <span className="anime-statistics-tile d-flex a-center j-center">
                  <FaHeart /> -{animeObj.favorites || "NA"}
                </span>
                <span className="anime-statistics-tile d-flex a-center j-center">
                  <FaEye /> -{animeObj.members | "NA"}
                </span>
                <span className="anime-statistics-tile d-flex a-center j-center">
                  HD
                </span>
              </div>
              <div className="button-wrapper">
                <button className="btn-primary hero-button">
                  <FaPlayCircle size={12} /> Watch Now
                </button>
                <button className="btn-secondary  hero-button">
                  Add to List <FaPlus size={12} />
                </button>
              </div>
              <p>
                {descIsCollapsed
                  ? animeObj.synopsis?.slice(0, 350) + "..."
                  : animeObj.synopsis}
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => setDescIsCollapsed((prev) => !prev)}
                >
                  [ {descIsCollapsed ? "More" : "Less"} ]
                </span>
              </p>
              <Share style={{ padding: 0, margin: 0 }} />
            </div>
          </div>
        </div>

        <div className="details-header-secondary">
          <div className="details-header-statistics">
            <p>
              <b>Japanese:</b> {animeObj.title_japanese}
            </p>
            <p>
              <b>Synonyms:</b> {synonyms.length > 0 ? synonyms : "N/A"}
            </p>
            <p>
              <b>Aired:</b>
              {animeObj.aired.string || "?"}
            </p>
            <p>
              <b>Duration:</b> {animeObj.duration || "NA"}
            </p>
            <p>
              <b>Score:</b> {animeObj.score}
            </p>
            <p>
              <b>Status:</b> {animeObj.status}
            </p>
            <p>
              <b>Premiered:</b> {animeObj.season || "Season: ?" + " "}
              {animeObj.year || "Year: ?"}
            </p>
          </div>
          <div className="details-header-genre">
            <p>
              <b>Genre: </b>
              {genre}
            </p>
          </div>
          <div className="details-header-studio">
            <p>
              <b>Producers: </b>
              {producers}
            </p>
            <p>
              <b>Licensors: </b>
              {licensors}
            </p>
            <p>
              <b>Studios: </b>
              {studios}
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <LoadingSpinner />
  );
}
