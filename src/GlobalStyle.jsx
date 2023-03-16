import { createGlobalStyle } from "styled-components"

const fonts = {
    Humanbumsuk : "Humanbumsuk",
}
const GlobalStyle = createGlobalStyle`
        * {
            font-family: ${fonts.Humanbumsuk};
            
        }
`;
    
export default GlobalStyle;