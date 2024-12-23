const router = require('express').Router();
const {  User, Game } = require('../models');
const withAuth = require('../utils/auth');
const handleError = require('../utils/handleError')
const { log, info, warn, error } = require('@frenzie24/logger');

router.get('/', async (req, res) => {
  log('Homepage request');
  try {
    // Get all users and JOIN with user data and comments
/*
    const usersData = await User.findAll({
      include: [{ model: Game }],
    });

    // Serialize data so the template can read it

    log(usersData)
    // Pass serialized data and session flag into template
*/
    try {
      return res.status(200);
    } catch (err) {
      return handleError(err, req.session.logged_in, res);
    }

    }
    catch (err) {
      return handleError(err, req.session.logged_in, res);
    }

  });




// navs to post and gets data from associated id
/*
router.get('/post/', async (req, res) => {

  try {
    const _id = Math.floor(req.query.id);
    log(`id: ${_id}`);
    // if _id is not an integer then exit
    if (!Number.isInteger(_id)) {
      warn(`Bad request: id invalid`); handleError(err, req.session.logged_in, res);

    }
    // find the post by id, include related comments and related user's name attribute

    info(`Attempting to retrieve post with id: ${_id}`)
    const postData = await Post.findByPk(_id, {
      include: [
        {
          model: User,
          attributes: ['name', 'id'],
        }, {
          model: Comment,
          include: [{ model: User, attributes: ['id', 'name'] }]
        },
      ],
    });

    const post = postData.get({ plain: true });

    log(req.session.logged_in)


    for (let i = 0; i < post.Comments.length; i++) {
      post.Comments[i].current_user_id = req.session.user_id;
    }

    log(['post:', post, 'comments:', post.Comments], ['brightMagenta', 'magenta'], 'none');
    const loggedIn = req.session.logged_in;
    post.current_user_id = req.session.user_id;
    //  log([currentUserId, typeof currentUserId], 'magenta')
    //   let current_user_id = currentUserId ? currentUserId : -1;
    // render the post page
    await res.status('post', {
      post,
      //   current_user_id: current_user_id,
      logged_in: loggedIn,
    });
  } catch (err) {
    // we had an eror log the error and send a message to the client
    return handleError(err, req.session.logged_in, res);
  }
});


// navs to post and gets data from associated id
router.get('/comment/', async (req, res) => {

  try {
    const _id = Math.floor(req.query.id);
    log(`id: ${_id}`);
    // if _id is not an integer then exit
    if (!Number.isInteger(_id)) {
      warn(`Bad request: id invalid`); handleError(err, req.session.logged_in, res);

    }
    // find the comment by id, include related comments and related user's name attribute

    info(`Attempting to retrieve comment with id: ${_id}`)
    const commentData = await Post.findByPk(_id, {
      include: [
        {
          model: User,
          attributes: ['name', 'id'],
        }


      ],
    });

    const comment = commentData.get({ plain: true });
    return handleError(`You dont belong here, ${comment.User.name}.  Sending you to login.`, req.session.logged_in, res);

  } catch (err) {
    // we had an eror log the error and send a message to the client
    return handleError(err, req.session.logged_in, res);
  }
});
*/

// Use withAuth middleware to prevent access to route
router.get('/', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{
        model: Post, include: [{
          model: User,
          attributes: ['name', 'id'],
        }, { model: Comment }]
      }]
    });

    const user = userData.get({ plain: true });
    log(user.users);
    res.status('200', {
      ...user,
      logged_in: true,
     // dashboard: true
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    info(`User is already logged in.`)
    res.redirect('/');
    return;
  }

  res.status('login');
});



module.exports = router;
