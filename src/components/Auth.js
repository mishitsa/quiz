
import React, { useState, useEffect, Fragment } from 'react'
import {Redirect } from 'react-router-dom'

const Auth = () => {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)


    useEffect(() => {

        return () => {
            setLogin('')
            setPassword('')
        }
    }, [])


    var tokenKey = "accessToken";
    // отпавка запроса к контроллеру AccountController для получения токена
    async function getTokenAsync(e) {
        e.preventDefault()
        if (login.trim() && password.trim()) {
            // получаем данные формы и фомируем объект для отправки
            const formData = new FormData();
            formData.append("grant_type", "password");
            formData.append("username", login);
            formData.append("password", password);

            //Запрос
            const response = await fetch(`https://localhost:44324/token`, {
                method: "POST",
                headers: { "Accept": "application/json" },
                body: formData
            });
            // получаем данные
            const data = await response.json();

            //если окей  - устанваливаем токен и переходим
            if (response.ok === true) {
                sessionStorage.setItem(tokenKey, data.access_token);
                console.log(data.access_token);
                setRedirect(true)
            }
            else {
                // если произошла ошибка
                console.log("Error: ", response.status, data.errorText);
            }
        }
    }


    return (
        <div className="center-block">
            <form>
                <div className="form-group row">
                    <div className="col-sm-10">
                        <input type="login" className="form-control" id="emailLogin" placeholder="Login" value={login} onChange={e => setLogin(e.target.value)} />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-10">
                        <input type="password" className="form-control" id="passwordLogin" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-40">

                        <button type="submit"
                            className="btn btn-primary mycl"
                            id="submitLogin"
                            onClick={e => getTokenAsync(e)}
                        >Sign in</button>
                        
                        {redirect ?
                        <Redirect to="/testing" />
                        : <Fragment></Fragment>}

                    </div>
                </div>
            </form>
        </div>
    )
}

export default Auth