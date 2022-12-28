const axios = require('axios');
const admin = require('firebase-admin');
const db = admin.firestore();

async function deleteAdCreative(req, res) {
  try {
    const collectionRef = db.collection('adcreatives').doc(req.params.id);

    const documents = await collectionRef.get();

    const id = documents._fieldsProto.ad_creative_id.stringValue;

    await axios.delete(
      `${process.env.API_VERSION}/${id}?access_token=${process.env.TOKEN}`
    );
    const docRef = await db.collection("adcreatives").doc(req.params.id).update({
      status: "DELETED"
    });
    res.status(200).json(docRef);
  } catch (error) {
    res.json(JSON.stringify(error));
  }
}

module.exports = deleteAdCreative;