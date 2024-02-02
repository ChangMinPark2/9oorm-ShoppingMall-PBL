import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    border: 1px solid lightblue;
    border-radius: 20px;
    height: 100%;

    button {
        border-radius: 0 0 20px 20px;
    }

    img {
        max-height: 200px;  // 이미지의 최대 높이를 더 크게 설정하세요.
        object-fit: contain;  // 이미지가 컨테이너를 넘치지 않도록 조절합니다.
        width: 100%;  // 이미지의 너비를 컨테이너에 맞게 조절합니다.
        border-radius: 20px 20px 0 0;
    }

    div {
        font-family: Arial, Helvetica, sans-serif;
        padding: 1rem;
        height: 100%;
        font-size: 0.8em;  // 글자 크기를 작게 설정하세요.
    }
`;
