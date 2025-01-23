import { useState } from 'react';

function Biometrics() {
    const [isButtonDisabled, setButtonDisabled] = useState(true);

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
                rp: { name: "pwaproto", id: window.location.hostname },
                user: { id: new Uint8Array(16), name: "test@example.com", displayName: "Test Name" },
                pubKeyCredParams: [
                    { type: "public-key", alg: -7 },
                    { type: "public-key", alg: -257 }
                ],
                timeout: 60000,
                authenticatorSelection: { residentKey: "preferred", requireResidentKey: false, userVerification: "preferred" },
                attestation: "direct"
            }
        });

        (window as any).currentPasskey = credentials;
        console.log(credentials);

        setButtonDisabled(false);
    }

    async function verifyPasskey() {
        try {
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
            <div className="biometricBlock">
                <button className="button" onClick={createPasskey} id="authenticate-btn">Authenticate</button>
                <button className="button" onClick={verifyPasskey} id="verify-btn" disabled={isButtonDisabled}>Verify</button>
            </div>
        </>
    )
}

export default Biometrics
