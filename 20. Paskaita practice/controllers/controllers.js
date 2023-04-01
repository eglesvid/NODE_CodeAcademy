import Post from "../db/postModel.js";
import dotenv from "dotenv";
import { request } from "express";

dotenv.config();
const JSON_URI = process.env.JSON_URI;

// {
//     "userId": 1,
//     "id": 1,
//     "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//     "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
//   },

// {
//     "_id": "640766b3aa5f941f7a7da0d2",
//     "userId": 9,
//     "title": "My first post",
//     "body": "body of my post",
//     "__v": 0
//   },

export async function getAllPosts(req, res) {
  try {
    const mongoRequest = Post.find({}, { __v: false }); //Jeigu cia nuimam await, sitose vietose nebelaukia kol padaro requesta, t. y. uzfiksuoja ta requesta, bet naulaukia, kol jis baigsis. Prie Promise.all dalies mes iskart issiunciam abu requestus ir sakom daryk juos vienu metu ir kai ju abieju sulauksi ir jeigu jie abu yra sekmingi, tada mes galim pasiimti ta info. (Jeigu awaitintume po viena, tai is pradziu imtu info is mongodb, pasiziuri ar viskas ok, ir tik veliau darytu req i jsonplaceholder. O kai naudojam Promise.all juos abu daro vienu metu - abiems sauna ir is abieju laukia response. TODEL Promise.all EFEKTYVIAU
    const placeholderRequest = fetch(JSON_URI);

    const [mongoResponse, placeholderResponse] = await Promise.all([
      mongoRequest,
      placeholderRequest,
    ]);

    const placeholderPosts = await placeholderResponse.json(); //konvertuojam i normalu objekta

    //toks dalykas, kai mes kaitaliojam pavadinimus/kitaip sudeliojam info yra vadinamas serialized
    const serializedMongoPosts = mongoResponse.map((post) => ({
      id: post._id,
      userId: post.userId,
      title: post.title,
      body: post.body,
    })); //galim be return rasyt, kadangi tik 1 eilute kodo. Tik reikalingi paprasti skliausteliai

    //apjungiam. Pridedam ..., kad isskleistu
    res.json([...serializedMongoPosts, ...placeholderPosts]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getPostsWithTitle(req, res) {
  try {
    const mongoRequest = Post.find({}, { title: true, userId: true });
    const placeholderRequest = fetch(JSON_URI);

    const [mongoResponse, placeholderResponse] = await Promise.all([
      mongoRequest,
      placeholderRequest,
    ]);

    const placeholderPosts = await placeholderResponse.json();

    const combinedPosts = [...placeholderPosts, ...mongoResponse]; //abu isskleidziu

    const serializedPosts = combinedPosts.map((post) => ({
      title: post.title,
      userId: post.userId,
    }));

    res.json(serializedPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getPostsWithBody(req, res) {
  try {
    const mongoRequest = Post.find({}, { body: true, userId: true, _id: true });
    const placeholderRequest = fetch(JSON_URI);

    const [mongoResponse, placeholderResponse] = await Promise.all([
      mongoRequest,
      placeholderRequest,
    ]);

    const placeholderPosts = await placeholderResponse.json();

    const combinedPosts = [...mongoResponse, ...placeholderPosts];
    const serializedPosts = combinedPosts.map((post) => ({
      body: post.body,
      userId: post.userId,
      id: post.id,
    }));

    res.json(combinedPosts);

    // const serializedMongoPosts = mongoResponse.map((post) => ({
    //   id: post._id,
    //   body: post.body,
    //   userId: post.userId,
    // }));

    // const serializedPlaceholderPosts = placeholderPosts.map((post) => {
    //   const { title, ...rest } = post; //is pradziu pasiimk title ir tada sitas spread operator reiskia pasiimk visus kitus, kurie liko - tai gaunasi, kad pasiima visus fields, kurie buvo, isskyrus title, kadangi jis jau yra paimtas. Rest - kintamojo pavadinimas, galima ir kitaip pavadint. ... - reiskia pasiimk viska, kas liko
    //   return rest;
    // });

    // res.json([...serializedMongoPosts, ...serializedPlaceholderPosts]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getPostsById(req, res) {
  //dabar jau nedarysim Promise.all
  try {
    const { id } = req.params;

    const placeholderRes = await fetch(JSON_URI + `/${id}`);
    const placeholderPost = await placeholderRes.json();

    if (Object.keys(placeholderPost).length === 0) {
      if (id.length === 24) {
        const mongoPost = await Post.findById(id);
        if (mongoPost === null) {
          res.status(404).json({ message: `no post found for ${id}` });
        } else {
          res.json(mongoPost);
        }
      } else {
        res.status(404).json({ message: `no post found for ${id}` });
      }
    } else {
      res.json(placeholderPost);
    }

    //Vietoj sito, virsuj pasidarem paprastesni varianta, kur pirmiau darom req i jsonplaceholder. Jeigu ten neranda, tada i mongodb
    // if (id.length === 24) {
    //   const mongoPost = await Post.findById(id); //jeigu 24, tuomet pirma darom req i mongodb

    //   if (mongoPost === null) { //jeigu mongodb nieko nerado, tuomet darom papildoma req i jsonplaceholder
    //     const placeholderRes = await fetch(JSON_URI + `/${id}`);
    //     const placeholderPost = await placeholderRes.json();

    //     if (Object.keys(placeholderPost).length === 0) { //ir tada tikrinam ar jame kazkada rado, jeigu nerado, tada 404
    //       return res.status(404).json({ message: `No post found for ${id}` });
    //     }
    //     res.json(placeholderPost);
    //   } else {
    //     res.json(mongoPost);
    //   }
    // } else { //jei length nera 24, tuomet praskipina ta visa kodo dali ir siunciam req tik i jsonplaceholder
    //   const placeholderRes = await fetch(JSON_URI + `/${id}`);
    //   const placeholderPost = await placeholderRes.json();

    //   if (Object.keys(placeholderPost).length === 0) {
    //     return res.status(404).json({ message: `No post found for ${id}` });
    //   }
    //   res.json(placeholderPost);
    // }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createNewPost(req, res) {
  try {
    const { userId, title, body } = req.body;

    const post = await Post.create({
      userId,
      title,
      body,
    });

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
