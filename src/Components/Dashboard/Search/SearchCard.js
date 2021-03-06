import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { saveStrain } from "../../../Actions/ActionCreator";
import { useParams } from "react-router-dom";
import { axiosWithAuth } from "../../../Utils/axiosWithAuth";
import Header from "../Header";
import styled from "styled-components";
import hybrid from "../../../img/hybrid.png";
import indica from "../../../img/indica.png";
import sativa from "../../../img/sativa.png";

const SearchCardContainer = styled.div`
  .search-card-container {
    margin: 0 auto;
    margin-top: 64px;
    margin-bottom: 64px;
    width: 1024px;

    .first-section {
      height: 320px;
      border-bottom: 2px solid lightgray;
      display: flex;

      .image {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          height: 192px;
        }
      }

      .information {
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .race {
          font-size: 0.875rem;
          font-weight: 500;
          color: #333;
        }

        h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #333;
        }

        .saveButton{
          padding: 12px;
          margin: 4px 0;
          color: white;
          background: #46b430;
          font-family: "Quicksand", sans-serif;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: 0.25s;
          border: none;
          border-radius: 3px;
          :hover {
            opacity: 0.75;
          }
        }

        .rating {
          font-size: 1rem;
          font-weight: 500;
          color: #333;
        }

        .terpenes {
          font-size: 1rem;
          font-weight: 500;
          color: #333;
        }
      }
    }

    h3 {
      margin-top: 32px;
      font-size: 1.5rem;
      font-weight: 700;
      color: #333;
    }

    .description {
      margin-top: 4px;
      font-size: 1rem;
      font-weight: 500;
      color: #333;

      a {
        color: #46b430;
        transition: 0.25s;

        :hover {
          opacity: 0.75;
        }
      }
    }
  }
`;

const SearchCard = props => {
  const [strain, setStrain] = useState({});

  const { id } = useParams();
  
  useEffect(() => {
    axiosWithAuth()
      .get(`https://bestbudapp.herokuapp.com/api/strains/${id}`)
      .then(response => {
        setStrain(response.data);
      });
  }, [id]);

  const saveToCabinet = strain_id => {
    props.saveStrain({strain_id: strain_id});
  };

  return (
    <SearchCardContainer>
      <Header/>

      <div className="search-card-container">
        <div className="first-section">
          <div className="image">
            {strain.race === "sativa" && <img src={sativa} alt="sativa" />}
            {strain.race === "indica" && <img src={indica} alt="indica" />}
            {strain.race === "hybrid" && <img src={hybrid} alt="hybrid" />}
          </div>
          <div className="information">
            <p className="race">{strain.race}</p>
            <h2>{strain.name}</h2>
            <button className="saveButton" onClick={()=>saveToCabinet(strain.id)}>Save</button>
            <p className="rating">{strain.rating} stars</p>
            <p className="terpenes">Flavors: {strain.flavors}</p>
          </div>
        </div>

        <h3>Description</h3>
        <p className="description">{strain.description}</p>

        <h3>Positive Effects</h3>
        <p className="description">{strain.positive_effects}</p>

        <h3>Negative Effects</h3>
        <p className="description">{strain.negative_effects}</p>

        <h3>Medical Uses</h3>
        <p className="description">{strain.medical_uses}</p>

        <h3>Reviews</h3>
        <p className="description">Reviews coming soon...</p>

        <h3>Dosing</h3>
        <p className="description">
          For information on dosing, we recommend reading this{" "}
          <a href="https://www.leafly.com/news/health/a-physicians-perspective-on-optimal-cannabis-dosing">
            article
          </a>
          .
        </p>

        <h3>Intake Methods</h3>
        <p className="description">
          For information on different intake methods, we recommend reading this{" "}
          <a href="https://www.leafly.com/news/cannabis-101/the-complete-list-of-cannabis-delivery-methods">
            article
          </a>
          .
        </p>

        {/* <h3>Intake Schedule</h3>
        blog post or article on this topic */}

        <h3>Dispensaries Nearby</h3>
        <p className="description">This strain is not available near you.</p>
      </div>
    </SearchCardContainer>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, { saveStrain })(SearchCard);
