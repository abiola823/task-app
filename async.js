const posts = [
   {title: "post one", body: 'This is post one'},
   {title: "post two", body: 'This is post two'},
   {title: "post three", body: 'This is post three'},
   {title: "post four", body: 'This is post four'}
];
function getPosts() {
    setTimeout(() => {
        let output = '';
        posts.forEach((post, index) => { 
            output +=  `${post.title} `;
        });
        console.log(output);
    }, 1000);
   
}
getPosts();
 function setPosts() {
    setTimeout(() => {
        let output = '';
        posts.forEach((post, index) => { 
            output +=  `${post.title} `;
        });
        console.log(output);
    }, 2000);
   
}
setPosts( {title: "post four", body: 'This is post four'});