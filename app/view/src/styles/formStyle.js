import styled from "styled-components"
export const FormStyle = styled.div`
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0,0,0,.1);
    margin: 50px auto;
    max-width: 400px;
    padding: 50px;
    text-align: center;
h1 {
    color: #3b5998;
    font-family: 'Arial';
    margin-bottom: 50px;
}

label {
    color: #999;
    display: block;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 5px;
    text-transform: uppercase;
}
input[type="email"],
input[type="password"] {
    border-radius: 3px;
    font-family: 'Arial';
    font-size: 16px;
    margin-bottom: 20px;
    padding: 10px;
    width: 100%;
}
button[type="submit"] {
    background-color: #3b5998;
    border: none;
    border-radius: 3px;
    box-shadow: 0 1px 2px rgba(0,0,0,.1);
    color: #fff;
    cursor: pointer;
    font-family: 'Arial';
    font-size: 16px;
    font-weight: 700;
    padding: 10px 20px;
    text-transform: uppercase;
    transition: background-color .3s ease;
}
button[type="submit"]:hover {
    background-color: #2d4373;
}
button[type="submit"] {
    background-color: #3b5998;
    border: none;
    border-radius: 3px;
    box-shadow: 0 1px 2px rgba(0,0,0,.1);
    color: #fff;
    cursor: pointer;
    font-family: 'Arial';
    font-size: 16px;
    font-weight: 700;
    padding: 10px 20px;
    text-transform: uppercase;
    transition: background-color .3s ease;
}
button[type="submit"]:hover {
    background-color: #2d4373;
}
.message{
  color:red
}`
