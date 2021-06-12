var e=ace.edit('myEditor');
e.getSession().setMode('ace/mode/c_cpp')  //language set
e.setTheme('ace/theme/xcode')   //set theme
e.setFontSize(16)
e.container.style.lineHeight = 1.6
e.setValue(`// Online C compiler to run C program online
#include <stdio.h>

int main() {
    // Write C code here
    printf("Hello world");
    
    return 0;
}`)

window.onload = reset;
      //  var e1=ace.edit('output');
      // e1.getSession().setMode('ace/mode/c_cpp')  //language set
      // e1.setTheme('ace/theme/twilight') 
      // e1.setValue(``)

      $(document).ready(function(){
      	$(document).on('click',"#run",async function(){
      	$("#output").html(" ")
      	$("#memory").text("")
	    $("#time").text("")
      	var code=e.getValue();
      	var lan = document.getElementById("language");
	    var language = lan.value;

	    var input=$("#ip").val()

    const payload = {
      language,
      code,
      input
    };
    try {
     const res = await axios.post("https://online-compiler-backend.herokuapp.com/run", payload);
     var result;
     console.log(res)
     console.log(res.data.statusCode)
     if(res.data.statusCode==4)
     {

     	result=res.data.data.run_status.output_html
     	$("#output").html(result)
     	$("#memory").append("<b>Memory Used    :  </b>"+res.data.data.run_status.memory_used)
     	$("#time").append("<b>Execution Time :  </b>"+res.data.data.run_status.time_used)
     }
     else if(res.data.statusCode==0 || res.data.statusCode==1)
     {
     	result=res.data.data.compile_status
     	$("#output").html(result)
     	console.log(result)
     }
     else
     {
     	$("#output").html('<b style="color:red">Run time Error...!</b>')
     	console.log(result)
     }
     
     // $("#memory").text('new-dynamic-text')
     // console.log(data)
    } catch (error) {
    	console.log(error.status)
    } 
    // try {
    //  const { data } = await axios.post("http://localhost:5000/run", payload);
    //  $("#output").html(data.output)
    //  console.log(data)
    // } catch ({response}) {
    //   if (response) {
    //     const errMsg = response.data.err.stderr;
    //     $("#output").html(errMsg)
    //     console.log(errMsg)
    //   } else {
    //   	$("#output").html("Please retry submitting")
    //   	console.log("Please retry submitting.")
    //   }
    // } 
      	})
      
      })

$(document).on('click',"#clear",async function(){
  reset()
}) 

	function changeTheme()
      {
      	 var t = document.getElementById("theme");
		  var th = t.value;
		  var th1='ace/theme/'+th
		   e.setTheme(th1)
      }

function changeLanguage()
{
	$("#output").html(" ")
	var l = document.getElementById("language");
	var lang = l.value;
	var lang1;
	var text;
	if(lang=='python')
	{
		lang1='ace/mode/python'
		text=`# Online Python compiler (interpreter) to run Python online.
# Write Python 3 code in this online editor and run it.
print("Hello world")`
	}
	else if(lang=='java')
	{
		lang1='ace/mode/java'
		text=`// Online Java Compiler
// Use this editor to write, compile and run your Java code online

class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!"); 
    }
}`
	}
	else if(lang=='c')
	{
		lang1='ace/mode/c_cpp'
		text=`// Online C compiler to run C program online
#include <stdio.h>
int main() {
    // Write C code here
    printf("Hello world");
    return 0;
}`
	}
	else if(lang=='cpp')
	{
		lang1='ace/mode/c_cpp'
		text=`// Online C++ compiler to run C++ program online
#include <iostream>
int main() {
    // Write C++ code here
    std::cout << "Hello world!";
    return 0;
}`

	}
	e.getSession().setMode(lang1)  //language set
    e.setValue(text) 

}

function reset()
{
    $('#ip').val("");
	$("#output").html(" ")
	$("#memory").text("")
	$("#time").text("")
	changeLanguage();
	changeTheme();
}