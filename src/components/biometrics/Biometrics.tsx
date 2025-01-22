import { useState } from 'react';

function Biometrics() {
    const [isButtonDisabled, setButtonDisabled] = useState(true);

    //the challenge is a crucial part of the authentication process, 
    //and is used to mitigate "replay attacks" and allow server-side authentication
    //in a real app, you'll want to generate the challenge server-side and 
    //maintain a session or temporary record of this challenge in your DB
    function generateRandomChallenge() {
        let length = 32;
        let randomValues = new Uint8Array(length);
        window.crypto.getRandomValues(randomValues);
        return randomValues;
    }

    async function createPasskey() {
        if (!navigator.credentials || !navigator.credentials.create || !navigator.credentials.get) {
            return alert("Your browser does not support the Web Authentication API");
        }

        let credentials = await navigator.credentials.create({
            publicKey: {
                challenge: generateRandomChallenge(),
                rp: { name: "Pwa", id: window.location.hostname },
                //here you'll want to pass the user's info
                user: { id: new Uint8Array(16), name: "test@example.com", displayName: "Test Name" },
                pubKeyCredParams: [
                    { type: "public-key", alg: -7 },
                    { type: "public-key", alg: -257 }
                ],
                timeout: 60000,
                authenticatorSelection: { residentKey: "preferred", requireResidentKey: false, userVerification: "preferred" },
                attestation: "direct",
                extensions: { credProps: true }
            }
        });

        //in a real app, you'll store the credentials against the user's profile in your DB
        //here we'll just save it in a global variable
        (window as any).currentPasskey = credentials;
        console.log(credentials);

        setButtonDisabled(false);
    }

    async function verifyPasskey() {
        try {
            //to verify a user's credentials, we simply pass the 
            //unique ID of the passkey we saved against the user profile
            //in this demo, we just saved it in a global variable
            let credentials = await navigator.credentials.get({
                publicKey: {
                    challenge: generateRandomChallenge(),
                    allowCredentials: [{ type: "public-key", id: (window as any).currentPasskey.rawId }]
                }
            });
            console.log(credentials);
            alert("Biometric authentication successful!");
        }
        catch (err) {
            alert(err);
        }
    }

    return (
        <>
            <div className="animate done" id="demo-btns">
                <button className="btn" onClick={createPasskey} id="authenticate-btn">Authenticate</button>
                <button className="btn" onClick={verifyPasskey} id="verify-btn" disabled={isButtonDisabled}>Verify</button>
            </div>
        </>
    )
}

export default Biometrics
