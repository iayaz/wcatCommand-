#!/usr/bin/env node
let fs = require("fs");
let inputArr = process.argv.slice(2);

let OptionsArr = [];
let filesArr = [];
//Options identify
for(let i = 0 ; i < inputArr.length ; i++)
{
    let firstChar = inputArr[i].charAt(0);
    if(firstChar == '-')
    {
        OptionsArr.push(inputArr[i]);
    }
    else
    {
        filesArr.push(inputArr[i]);
    }
}
//options check
let isBothPresent = OptionsArr.includes("-b") && OptionsArr.includes("-n");
if(isBothPresent)
{
    console.log("Either enter  -n or -b !!");
    return;
} 


//existence
for(let  i = 0 ; i < filesArr.length ; i++)
{
    let correctFile = fs.existsSync(filesArr[i]);
    if(correctFile == false)
    {
        console.log(`file ${filesArr[i]} is not present!!`);
        return ;
    }
}



//read
let content = "";
for( let i = 0 ; i < filesArr.length ; i++)
{
    let bufferContent  = fs.readFileSync(filesArr[i]);
    content +=bufferContent+"\r\n";
}
//console.log(content);

let contentArr = content.split("\r\n");

//-s
let isSPresent = OptionsArr.includes("-s");
if(isSPresent == true)
{
    for( let  i = 1 ; i < contentArr.length ;i++)
    {
       if(contentArr[i]=="" && contentArr[i-1] == "")
       contentArr[i] == null;

       else if(contentArr[i] == "" && contentArr[i-1] == null )
       contentArr[i] = null;
    }

    let tempArr = [];
    for(let i = 0 ; i <contentArr.length ;i++)
    {
        if(contentArr[i] != null)
        {
            tempArr.push(contentArr[i]);
        }
    }
    contentArr = tempArr;
}
//console.log(contentArr.join("\n"));

if(OptionsArr.includes("-n"))
{
    for(let i = 0 ; i < contentArr.length ;i++)
    {
        contentArr[i] =`${i+1} ${contentArr[i]}`;
    }
}
console.log(contentArr.join("\n"));

if(OptionsArr.includes("-b"))
{
    let counter  = 1;
    for(let i = 0 ; i < contentArr.length ;i++)
    {   if(contentArr[i]!= "")
            {
                contentArr[i] =`${counter} ${contentArr[i]}`;
                counter++;
            }
    }
}
console.log(contentArr.join("\n"));