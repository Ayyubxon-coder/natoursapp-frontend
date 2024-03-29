import { FC } from 'react';
import { ButtonPropType } from '../../types/types';
import styled, { css } from 'styled-components';

const ButtonBase = styled.button<ButtonPropType>`
  ${(props) =>
    props.GreenBtn &&
    css`
      background-color: var(--greenColor-55);
      color: var(--whiteColor);
    `}

  ${(props) =>
    props.WhiteBtn &&
    css`
      background-color: var(--whiteColor);
      color: var(--lightGray);
    `}

    ${(props) =>
    props.SmallBtn &&
    css`
      padding: 1.25rem 3rem !important;
      font-size: 1.4rem !important;
    `}

    ${(props) =>
    props.SpanRows &&
    css`
      grid-row: 1 / -1;
    `}
    ${(props) =>
    props.AlignRigt &&
    css`
      margin-left: 40%;
    `}

  font-size: 1.6rem;
  padding: 1.4rem 3rem;
  border-radius: 10rem;
  text-transform: uppercase;
  display: inline-block;
  text-decoration: none;
  position: relative;
  -webkit-transition: all 0.4s;
  transition: all 0.4s;
  font-weight: 400;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  /*Add later when we use this for the button in form*/
  border: none;
  cursor: pointer;
  :hover {
    -webkit-transform: translateY(-3px);
    transform: translateY(-3px);
    -webkit-box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.15);
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.15);
  }
  :active {
    -webkit-transform: translateY(-1px);
    transform: translateY(-1px);
    -webkit-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  }
  :focus {
    outline: none;
    background-color: #2e864b;
  }
`;

export const Button: FC<ButtonPropType> = ({
  children,
  WhiteBtn,
  SmallBtn,
  GreenBtn,
  SpanRows,
  AlignRigt,
  onClickFunc,
}) => {
  return (
    <ButtonBase
      WhiteBtn={WhiteBtn}
      SmallBtn={SmallBtn}
      GreenBtn={GreenBtn}
      SpanRows={SpanRows}
      AlignRigt={AlignRigt}
      onClick={onClickFunc}
    >
      {children}
    </ButtonBase>
  );
};
