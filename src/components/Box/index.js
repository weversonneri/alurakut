import styled from 'styled-components';

export const Box = styled.div`
  background: #FFFFFF;
  border-radius: 8px;
  padding: 16px;
  /* CSS Pré-Pronto */
  margin-bottom: 10px;
  .boxLink {
    font-size: 14px;
    color: #2E7BB4;
    text-decoration: none;
    font-weight: 800;
  }
  .title {
    font-size: 1.75rem;
    font-weight: 400;
    margin-bottom: 10px;
  }
  .subTitle {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  .smallTitle {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 700;
    color: #333333;
    margin-bottom: 20px;
  }
  hr {
    margin-top: 12px;
    margin-bottom: 8px;
    border-color: transparent;
    border-bottom-color: #ECF2FA;
  }
  input {
    width: 100%;
    background-color: #F4F4F4;
    color: #333333;
    border: 0;
    padding: 14px 16px;
    margin-bottom: 14px;
    border-radius: 25px;
    ::placeholder {
      color: #333333;
      opacity: 1;
    }
  }
  textarea {
    width: 100%;
    min-height: 6rem;
    background-color: #F4F4F4;
    color: #333333;
    border: 0;
    border-style: none;
    padding: 14px 16px;
    margin-bottom: 14px;
    border-radius: 25px;
    ::placeholder {
      color: #333333;
      opacity: 1;
    }
  }
  button {
    border: 0;
    padding: 8px 12px;
    color: #FFFFFF;
    border-radius: 10000px;
    background-color: #6F92BB;
  }

   .scraps-box ul {
    list-style: none;
  }
   .scraps-box li {
    display: grid;
    grid-gap: 8px;
    grid-template-columns: 1fr 3fr; 
    max-height: 220px;
    list-style: none;
    margin-bottom: 10px;
  }
  
  .scraps-box img {
    object-fit: cover;
    background-position: center center;
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 0.5rem;
    max-width: 100px;
    max-height: 90px;
  }
  .daily-quote {
    font-size: 0.75rem;
    opacity: 0.6;
  }
  .bio-box {
    font-size: 0.75rem;
    opacity: 0.6;
  }
  .top-button {
    border: 0;
    padding: 8px 12px;
    color: #2E7BB4;
    border-radius: 8px;
    background-color: #D9E6F6;
    margin-bottom: 1rem;
    margin-right: 1rem;
  }
  .is-active {
    border: 0;
    padding: 8px 12px;
    color: #FFFFFF;
    border-radius: 8px;
    background-color: #6F92BB;
    margin-bottom: 1rem;
    margin-right: 1rem;
  }
`;
