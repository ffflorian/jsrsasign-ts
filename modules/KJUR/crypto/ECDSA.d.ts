declare namespace jsrsasign.KJUR.crypto {
  /**
   * class for EC key generation,  ECDSA signing and verifcation
   * @class class for EC key generation,  ECDSA signing and verifcation
   * @description
   * CAUTION: Most of the case, you don't need to use this class except
   * for generating an EC key pair. Please use `KJUR.crypto.Signature` class instead.
   *
   * This class was originally developped by Stefan Thomas for Bitcoin JavaScript library.
   * (See https://github.com/bitcoinjs/bitcoinjs-lib/blob/master/src/ecdsa.js)
   * Currently this class supports following named curves and their aliases.
   *
   * * secp256r1, NIST P-256, P-256, prime256v1 (*)
   * * secp256k1 (*)
   * * secp384r1, NIST P-384, P-384 (*)
   */
  class ECDSA {
    getBigRandom(limit): BigInteger;
    setNamedCurve(curveName): void;
    setPrivateKeyHex(prvKeyHex): void;
    setPublicKeyHex(pubKeyHex): void;

    /**
     * get X and Y hexadecimal string value of public key
     * @return associative array of x and y value of public key
     * @example
     * ec = new KJUR.crypto.ECDSA({'curve': 'secp256r1', 'pub': pubHex});
     * ec.getPublicKeyXYHex() → { x: '01bacf...', y: 'c3bc22...' }
     */
    getPublicKeyXYHex(): Array<any>

    /**
     * get NIST curve short name such as "P-256" or "P-384"
     * @return short NIST P curve name such as "P-256" or "P-384" if it's NIST P curve otherwise null;
     * @example
     * ec = new KJUR.crypto.ECDSA({'curve': 'secp256r1', 'pub': pubHex});
     * ec.getShortPCurveName() → "P-256";
     */
    getShortNISTPCurveName(): string

    /**
     * generate a EC key pair
     * @return associative array of hexadecimal string of private and public key
     * @example
     * var ec = new KJUR.crypto.ECDSA({'curve': 'secp256r1'});
     * var keypair = ec.generateKeyPairHex();
     * var pubhex = keypair.ecpubhex; // hexadecimal string of EC public key
     * var prvhex = keypair.ecprvhex; // hexadecimal string of EC private key (=d)
     */
    generateKeyPairHex(): Array<any>

    /**
     * signing to message hash
     * @param {String} hashHex hexadecimal string of hash value of signing message
     * @param {String} privHex hexadecimal string of EC private key
     * @return hexadecimal string of ECDSA signature
     * @example
     * var ec = new KJUR.crypto.ECDSA({'curve': 'secp256r1'});
     * var sigValue = ec.signHex(hash, prvKey);
     */
    signHex(hashHex, privHex): string

    sign(hash, priv): Array<number>

    verifyWithMessageHash(hashHex, sigHex): boolean;

    /**
     * verifying signature with message hash and public key
     * @param {String} hashHex hexadecimal string of hash value of signing message
     * @param {String} sigHex hexadecimal string of signature value
     * @param {String} pubkeyHex hexadecimal string of public key
     * @return true if the signature is valid, otherwise false
     * @example
     * var ec = new KJUR.crypto.ECDSA({'curve': 'secp256r1'});
     * var result = ec.verifyHex(msgHashHex, sigHex, pubkeyHex);
     */
    verifyHex(hashHex, sigHex, pubkeyHex)

    verify(hash, sig, pubkey): boolean;

    verifyRaw(e, r, s, Q): boolean;

    /**
     * Serialize a signature into DER format.
     *
     * Takes two BigIntegers representing r and s and returns a byte array.
     */
    serializeSig(r, s): Array<number>

    /**
     * Parses a byte array containing a DER-encoded signature.
     *
     * This function will return an object of the form:
     *
     * {
     *   r: BigInteger,
     *   s: BigInteger
     * }
     */
    parseSig(sig): { r: BigInteger, s: BigInteger };

    parseSigCompact(sig): any;

    /**
     * read an ASN.1 hexadecimal string of PKCS#1/5 plain ECC private key
     * @param {String} h hexadecimal string of PKCS#1/5 ECC private key
     */
    readPKCS5PrvKeyHex(h): void;

    /**
     * read an ASN.1 hexadecimal string of PKCS#8 plain ECC private key
     * @param {String} h hexadecimal string of PKCS#8 ECC private key
     */
    readPKCS8PrvKeyHex(h): void;

    /**
     * read an ASN.1 hexadecimal string of PKCS#8 ECC public key
     * @param {String} h hexadecimal string of PKCS#8 ECC public key
     */
    readPKCS8PubKeyHex(h): void;

    /**
     * read an ASN.1 hexadecimal string of X.509 ECC public key certificate
     * @param {String} h hexadecimal string of X.509 ECC public key certificate
     * @param {Integer} nthPKI nth index of publicKeyInfo. (DEFAULT: 6 for X509v3)
     */
    readCertPubKeyHex(h, nthPKI): void;

    /**
     * parse ASN.1 DER encoded ECDSA signature
     * @param {String} sigHex hexadecimal string of ECDSA signature value
     * @return associative array of signature field r and s of BigInteger
     * @example
     * var ec = new KJUR.crypto.ECDSA({'curve': 'secp256r1'});
     * var sig = ec.parseSigHex('30...');
     * var biR = sig.r; // BigInteger object for 'r' field of signature.
     * var biS = sig.s; // BigInteger object for 's' field of signature.
     */
    static parseSigHex(sigHex): { r: BigInteger, s: BigInteger };

    /**
     * parse ASN.1 DER encoded ECDSA signature
     * @param {String} sigHex hexadecimal string of ECDSA signature value
     * @return associative array of signature field r and s in hexadecimal
     * @example
     * var ec = new KJUR.crypto.ECDSA({'curve': 'secp256r1'});
     * var sig = ec.parseSigHexInHexRS('30...');
     * var hR = sig.r; // hexadecimal string for 'r' field of signature.
     * var hS = sig.s; // hexadecimal string for 's' field of signature.
     */
    static parseSigHexInHexRS(sigHex): { r: BigInteger, s: BigInteger };

    /**
     * convert hexadecimal ASN.1 encoded signature to concatinated signature
     * @param {String} asn1Hex hexadecimal string of ASN.1 encoded ECDSA signature value
     * @return r-s concatinated format of ECDSA signature value
     */
    static asn1SigToConcatSig(asn1Sig): string

    /**
     * convert hexadecimal concatinated signature to ASN.1 encoded signature
     * @param {String} concatSig r-s concatinated format of ECDSA signature value
     * @return hexadecimal string of ASN.1 encoded ECDSA signature value
     */
    static concatSigToASN1Sig(concatSig): string

    /**
     * convert hexadecimal R and S value of signature to ASN.1 encoded signature
     * @param {String} hR hexadecimal string of R field of ECDSA signature value
     * @param {String} hS hexadecimal string of S field of ECDSA signature value
     * @return hexadecimal string of ASN.1 encoded ECDSA signature value
     */
    static hexRSSigToASN1Sig(hR, hS): string

    /**
     * convert R and S BigInteger object of signature to ASN.1 encoded signature
     * @param {BigInteger} biR BigInteger object of R field of ECDSA signature value
     * @param {BigInteger} biS BIgInteger object of S field of ECDSA signature value
     * @return hexadecimal string of ASN.1 encoded ECDSA signature value
     */
    static biRSSigToASN1Sig(biR, biS): string

    /**
     * static method to get normalized EC curve name from curve name or hexadecimal OID value
     * @param {String} s curve name (ex. P-256) or hexadecimal OID value (ex. 2a86...)
     * @return normalized EC curve name (ex. secp256r1)
     * @description
     * This static method returns normalized EC curve name
     * which is supported in jsrsasign
     * from curve name or hexadecimal OID value.
     * When curve is not supported in jsrsasign, this method returns null.
     * Normalized name will be "secp*" in jsrsasign.
     * @example
     * KJUR.crypto.ECDSA.getName("2b8104000a") → "secp256k1"
     * KJUR.crypto.ECDSA.getName("NIST P-256") → "secp256r1"
     * KJUR.crypto.ECDSA.getName("P-521") → undefined // not supported
     */
    static getName(s: string): string;
  }
}