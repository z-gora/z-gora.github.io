var godziny = [[0, "10:10", "11:25", "12:40", "13:55"],[0, "10:41", "11:06", "11:56", "12:21", "13:11", "13:36"],[0, "10:25", "11:00", "11:40", "12:15", "12:55", "13:30"],[0, "10:25", "10:50", "11:40", "12:05", "12:55", "13:20"]];
$(document).ready(function() {
    var d = new Date();
    currentTime = timeParser(addZero(d.getHours()).toString() + ":" + addZero(d.getMinutes()).toString());
    //startup:
    for(i=0; i<godziny.length; i++) {
        for(j=1; j<godziny[i].length; j++) {
            if(timeParser(godziny[i][j]) >= currentTime) {
                $("#part"+i+" .times").append("<div class='time'>"+godziny[i][j]+"</div>");
            }
        }
    }
    
    prev=0;
    function update() {
        d = new Date();
        currentTime = timeParser(addZero(d.getHours()).toString() + ":" + addZero(d.getMinutes()).toString());
        $("#hour").text(addZero(d.getHours()));
        $("#minutes").text(addZero(d.getMinutes()));
        $("#seconds").text(addZero(d.getSeconds()));
        if(prev!=d.getMinutes()) {
            for (i=0; i<godziny.length; i++) {
                for (j=1; j<godziny[i].length; j++) {
                    if (timeParser(godziny[i][j]) >= currentTime) {
                        nextOne = j;
                        break;
                    }
                }
                //alert(i+" "+nextOne);
                if(j==godziny[i].length) {
                    $("#part"+i+" .countdown span").text("--");
                } else {
                    left = timeParser(godziny[i][nextOne])-currentTime;
                    if (left==0) {
                        wyjscie(i, left);
                    } else {
                        changeTime(i, left);
                    }
                    
                }
            }
        }
        prev = d.getMinutes();
    }
    
    function wyjscie(i, value) {
        $("#part"+i+" .countdown .go").addClass("present");
        setTimeout(function() {$("#part"+i+" .countdown span").text(value);}, 1700);
        setTimeout(function(){ $("#part"+i+" .countdown .go").removeClass("present"); $("#part"+i+" .times .time").first().remove();}, 60000);
    }
    function changeTime(i, value) {
        $("#part"+i+" .countdown span").animate({opacity: 0}, 1000, function() {
            $(this).text(value);
            $(this).animate({opacity: 1}, 1000);
        })
    }
    
    $("#clock").click(function() {
        document.documentElement.webkitRequestFullscreen();
    })
    
    setInterval(update, 1000);
});

//Funkcje pomocnicze
function addZero(num) {
    num = num.toString();
    if (num.length == 1) {
        num = "0"+num;
    }
    return num;
}

function timeParser(timestr) {
    arr = timestr.split(":");
    return 60*parseInt(arr[0])+parseInt(arr[1]);
}

function timeRev(timeint) {
    minuty=timeint%60;
    return addZero(Math.floor(timeint/60).toString())+":"+addZero(minuty.toString());
}

function genInterval(timestr, interval, times) {
    time0 = timeParser(timestr);
    text = "";
    for (i=0; i<times; i++) {
        text += "\"" + timeRev(time0+i*interval) + "\",";
    }
    return text.substring(0, text.length-1);
}