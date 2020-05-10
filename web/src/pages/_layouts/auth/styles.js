import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #ece9e6; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom,
    #ffffff,
    #ece9e6
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #ffffff,
    #ece9e6
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #666;
      margin: 0 0 12px;

      &::placeholder {
        color: rgba(0, 0, 0, 0.3);
      }
    }

    span {
      color: #3c4245;
      margin: 0 0 12px;
      font-size: 12px;
      align-self: flex-start;
      font-weight: bold;
    }

    button {
      background: #719192;
      margin: 5px 0 0;
      height: 44px;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#719192')};
      }
    }
  }
`;
