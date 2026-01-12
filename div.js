
function reverseWords(sentence) {
    return sentence.split(' ').reverse().join(' ');
}

console.log(reverseWords("Java is fun")); // "fun is Java"

function isRotation(str1, str2) {
    if (str1.length !== str2.length) return false;
   
    return (str1 + str1).includes(str2);
}

console.log(isRotation("ABCD", "CDAB")); 
