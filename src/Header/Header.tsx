import styled from "styled-components";
import { Button } from "@material-ui/core";
import { Wrapper } from "./Header.styles";

type HeaderProps = {
    handleLogoClick: () => void;
};


const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f0;
    margin-bottom: 1rem;
    margin-top: 5rem;
`;

const Logo = styled.h1`
  cursor: pointer;
`;

const Header: React.FC = () => {
    return (
        <HeaderWrapper>
            <Logo>SHOP</Logo>
        </HeaderWrapper>
    );
};

export default Header;
