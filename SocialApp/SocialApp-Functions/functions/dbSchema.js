let db = {
    users: [
        {
            userId: "uniqueUserIdHere35425368",
            email: "username@email.com",
            handle: "userHandle",
            createdAt: '2019-11-26T16:00:48.486Z',
            imagesUrl: 'image/uniquenjskdfbnsdgb',
            tagline: 'Anything for a price',
            website: 'http://smuggle.com',
            locations: ['Chicago'],
            specialty: "Guns N Drugs",
            whatsapp: "+99 593 34848 9448 40594"

    }
],
    posts: [
        {
            userHandle: 'user',
            body: 'this is the body',
            createdAt: '2019-11-24T17:02:52.001Z'
            likeCount: 5,
            commentCount: 2,
        }
    ],

    comments: [
        {
            userHandle: 'user',
            postId: 'fewfweasfedefef',
            body: 'I need the spiiiiiice',
            createdAt: '2019-11-24T17:02:52.001Z'
        }
    ],
    notifications: [
        {
            recipient: 'user',
            sender: 'johnson',
            read: 'true | false',
            screamId: 'jhbfsjhkdbfsdjlkfhbsdj',
            type: 'like | comment',
            createdAt: '2019-11-24T17:02:52.001Z'
        }
    ]
};

const userDetails = {
    //redux 
    credentials: {
            userId: "uniqueUserIdHere35425368",
            email: "username@email.com",
            handle: "userHandle",
            createdAt: '2019-11-26T16:00:48.486Z',
            imagesUrl: 'image/uniquenjskdfbnsdgb',
            tagline: 'Anything for a price',
            website: 'http://smuggle.com',
            locations: ['Chicago'],
            specialty: "Guns N Drugs",
            whatsapp: "+99 593 34848 9448 40594"
    },
    likes: [
        {
            userHandle: 'user',
            postId: "gnsiuldhgfjsd"
        },
        {
            userHandle: 'user',
            postId: "gnsifffuldhgfjsd"
        }
    ]
}