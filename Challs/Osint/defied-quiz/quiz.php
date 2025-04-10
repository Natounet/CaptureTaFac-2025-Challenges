<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Quiz</title>
        <style>
            body {
                text-align: center;
                background-color: white;
            }
            .questions {
                background: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .options {
                list-style: none;
                padding: 0;
            }
            .options li {
                margin: 10px 0;
            }
            button {
                background: blue;
                color: white;
            }
        </style>
    </head>
    <body>
        <h3>Cybersecurity quiz :</h3>
        <div class="questions">
            <form action="quiz.php" method="post" id="quiz">
                <div class="question1">What does CIA stands for in the context of information security ?</div>
                <ul class="options">
                    <li><input type="checkbox" name="q1a1">Confidentiality, Integrity and Availability</li>
                    <li><input type="checkbox" name="q1a2">Central Intelligence Agency</li>
                    <li><input type="checkbox" name="q1a3">Confidential Integry Agent</li>
                </ul>
                <br>
                <br>
                <div class="question2">Where is the head office of the host of the following website : <a target="_blank" href="https://www.metal-archives.com">https://www.metal-archives.com</a> ?</div>
                <ul class="options">
                    <li><input type="checkbox" name="q2a1">New York City / New York / USA</li>
                    <li><input type="checkbox" name="q2a2">San Jose / California / USA</li> 
                    <li><input type="checkbox" name="q2a3">Tempe / Arizona / USA</li>
                </ul>
                <br>
                <br>
                <div class="question3">What does CISO (RSSI) stands for ?</div>
                <ul class="options">
                    <li><input type="checkbox" name="q3a1">Central Integrity and Security Officer</li>
                    <li><input type="checkbox" name="q3a2">Chief Information Security Officer</li>
                    <li><input type="checkbox" name="q3a3">Communication and Information Secure Officer</li>
                </ul>
                <br>
                <br>
                <div class="question4">According to the GDPR (RGPD), is a DPO ABSOLUTELY necessary and OBLIGATED for a company of 10 employees ?</div>
                <ul class="options">
                    <li><input type="checkbox" name="q4a1">yes</li>
                    <li><input type="checkbox" name="q4a2">no</li>
                </ul>
                <br>
                <br>
                <div class="question5">which article of the French national consumer code states that providers of online platforms must carry out security audits and present the results to the users?</div>
                <ul class="options">
                    <li><input type="checkbox" name="q5a1">article L111-7-3</li>
                    <li><input type="checkbox" name="q5a2">article L111-1</li>
                    <li><input type="checkbox" name="q5a3">article L111-4</li>
                </ul>
                    <button type="submit">Submit</button>
            </form>
        </div>
        <p>The answer will be printed just below :</p>
    </body>
</html>

<?php
    function eqLists($l1, $l2){
        if (count($l1) != count($l2)){
            return false;
        }

        for($i = 0; $i<count($l1); $i++){
            if ($l1[$i] != $l2[$i]){
                return false;
            }
        }

        return true;
    }

    sleep(1);
    $correct_answers = [
        1, 0, 0,
        0, 0, 1,
        0, 1, 0,
        0, 1,
        1, 0, 0  
    ];

   $inputs = [
        "q1a1", "q1a2", "q1a3", 
        "q2a1", "q2a2", "q2a3", 
        "q3a1", "q3a2", "q3a3", 
        "q4a1", "q4a2",
        "q5a1", "q5a2", "q5a3" 
    ];

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $user_answers = [];
        
        for ($i = 0; $i < count($inputs); $i++) {
            if (isset($_POST[$inputs[$i]])) {
                array_push($user_answers, 1);
            } 
            else {
                array_push($user_answers, 0);
            } 
        } 

        if (eqLists($user_answers, $correct_answers)) {
            $message =  "Congratulations ! You correctly answered ! Here is the flag : \nCTFAC{quiz-ffd01d673d72a}";
        } 
        else {
            $message = "Incorrect(s) response(s). Please try again.";
        } 
        echo $message; 
    }
?>