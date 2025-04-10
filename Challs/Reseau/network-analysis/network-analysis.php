<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Network analysis report</title>
        <script>
            function hideDefaultOption(selectElement) {
                if (selectElement.value !== "") {
                    selectElement.querySelector("option[value='']").style.display = "none";
                }
            }
        </script>
    </head>
    <body>
        <h2>Complete the network traffic analysis report :</h2>
        <form method="post">
            <h3>Network traffic analysis report : </h3>
            <h4>Summary :</h4>
            <ul>
                <li>1. Introduction</li>
                <li>2. General PCAPNG file overview</li>
                <li>3. Packets investigation</li>
                <li>4. Conclusion</li>
            </ul>
            <br>
            <h4>1. Introduction :</h4>
            <p>
                A network packets traffic analysis was made in a informational and experimental purpose between an admin workstation and a local server.
                The pcapng file (capture.pcapng) is also available <a href="./capture.pcapng">here</a>.
            </p>
            <p>The ip of the admin PC is
                <select name="answer1" required onchange="hideDefaultOption(this)">
                    <option value="" <?= empty($answer1) ? '' : 'style="display:none;"' ?> selected>-- admin PC ip --</option>
                    <option value="192.168.2.5" <?= $answer1 == "192.168.2.5" ? 'selected' : '' ?>>192.168.2.5</option>
                    <option value="192.168.2.4" <?= $answer1 == "192.168.2.4" ? 'selected' : '' ?>>192.168.2.4</option>
                    <option value="192.168.2.24" <?= $answer1 == "192.168.2.24" ? 'selected' : '' ?>>192.168.2.24</option>
                </select>
                and the local server ip is 
                <select name="answer2" required onchange="hideDefaultOption(this)">
                    <option value="" <?= empty($answer2) ? '' : 'style="display:none;"' ?> selected>-- local server ip --</option>
                    <option value="192.168.2.5" <?= $answer2 == "192.168.2.5" ? 'selected' : '' ?>>192.168.2.5</option>
                    <option value="192.168.2.4" <?= $answer2 == "192.168.2.4" ? 'selected' : '' ?>>192.168.2.4</option>
                    <option value="192.168.2.24" <?= $answer2 == "192.168.2.24" ? 'selected' : '' ?>>192.168.2.24</option>
                </select>
                . In the following section, we will make a general PCAPNG file overview.
            </p>
            <br>
            <h4>2. General PCAPNG file overview :</h4>
            <p>
                First, we can see a serie of 
                <select name="answer3" required onchange="hideDefaultOption(this)">
                    <option value="" <?= empty($answer3) ? '' : 'style="display:none;"' ?> selected>-- packet type --</option>
                    <option value="Unknown" <?= $answer3 == "Unknown" ? 'selected' : '' ?>>Unknown</option>
                    <option value="ICMP" <?= $answer3 == "ICMP" ? 'selected' : '' ?>>ICMP</option>
                    <option value="ARP" <?= $answer3 == "ARP" ? 'selected' : '' ?>>ARP</option>
                </select>
                packets. We can notice that the machine does not seems to successfully reach the server for some reasons for a moment.
                After some TCP packets, we can see that 
                <select name="answer4" required onchange="hideDefaultOption(this)">
                    <option value="" <?= empty($answer4) ? '' : 'style="display:none;"' ?> selected>-- network tool --</option>
                    <option value="ping" <?= $answer4 == "ping" ? 'selected' : '' ?>>ping</option>
                    <option value="nslookup" <?= $answer4 == "nslookup" ? 'selected' : '' ?>>nslookup</option>
                </select>
                , a network tool was used to test the connexion between the 2 hosts. There is then a serie of ARP, DNS and TCP packets.

                Finally, we can see a 
                <select name="answer5" required onchange="hideDefaultOption(this)">
                    <option value="" <?= empty($answer5) ? '' : 'style="display:none;"' ?> selected>-- protocol --</option>
                    <option value="UDP" <?= $answer5 == "UDP" ? 'selected' : '' ?>>UDP</option>
                    <option value="HTTP" <?= $answer5 == "HTTP" ? 'selected' : '' ?>>HTTP</option>
                    <option value="DNS" <?= $answer5 == "DNS" ? 'selected' : '' ?>>DNS</option>
                    <option value="FTP" <?= $answer5 == "FTP" ? 'selected' : '' ?>>FTP</option>
                </select>
                request, followed by its response.
            </p>
            <br>
            <h4>3. Packets investigation :</h4>
            <p>
                First, we will focuse on the first packet ever captured in the file. It is an ARP sended to
                <select name="answer6" required onchange="hideDefaultOption(this)">
                    <option value="" <?= empty($answer6) ? '' : 'style="display:none;"' ?> selected>-- destination --</option>
                    <option value="Everybody" <?= $answer6 == "Everybody" ? 'selected' : '' ?>>Everybody on the local network</option>
                    <option value="192.168.2.24" <?= $answer6 == "192.168.2.24" ? 'selected' : '' ?>>192.168.2.24</option>
                    <option value="192.168.2.5" <?= $answer6 == "192.168.2.5" ? 'selected' : '' ?>>192.168.2.5</option>
                </select>
                in the objective to : 
                <select name="answer7" required onchange="hideDefaultOption(this)">
                    <option value="" <?= empty($answer7) ? '' : 'style="display:none;"' ?> selected>-- objective --</option>
                    <option value="msg-send" <?= $answer7 == "msg-send" ? 'selected' : '' ?>>send a message from 192.168.2.24 to the router</option>
                    <option value="find" <?= $answer7 == "find" ? 'selected' : '' ?>>to find who (which MAC address) is 192.168.2.24</option>
                </select>
                .
            </p>
            <p>
                Then, let's focuse on packet n°27. It is an ICMP request send by 192.168.2.5 to 192.168.2.4, followed by the packet n°28 as an ICMP reply, showing that this host is up and responding.
            </p>    
            <p>
                Finally, we will investigate the packets n°73 to n°75. We can see it is 
                <select name="answer8" required onchange="hideDefaultOption(this)">
                    <option value="" <?= empty($answer8) ? '' : 'style="display:none;"' ?> selected>-- protocol --</option>
                    <option value="TCP" <?= $answer8 == "TCP" ? 'selected' : '' ?>>TCP</option>
                    <option value="DNS" <?= $answer8 == "DNS" ? 'selected' : '' ?>>DNS</option>
                </select>
                packets. It obviously represent a TCP
                <select name="answer9" required onchange="hideDefaultOption(this)">
                    <option value="" <?= empty($answer9) ? '' : 'style="display:none;"' ?> selected>-- ? --</option>
                    <option value="HTTPS" <?= $answer9 == "HTTPS" ? 'selected' : '' ?>>security</option>
                    <option value="TCP3WH" <?= $answer9 == "TCP" ? 'selected' : '' ?>>3 ways handshake</option>
                    <option value="UDPSC" <?= $answer9 == "DNS" ? 'selected' : '' ?>>unsecure connection</option>
                    
                </select>
            </p>
            <br>
            <h4>4. Conclusion :</h4>
            <p>
                Finally, as a conclusion, we will try to determine what this capture really represent :
                First, the client (192.168.2.5) try to connect to a local server on address 192.168.2.24.
                It fails 15 times, before the client decide to try to join 192.168.2.4, successfully.
                It let us know that
                <select name="answer10" required onchange="hideDefaultOption(this)">
                    <option value="" <?= empty($answer10) ? '' : 'style="display:none;"' ?> selected>-- ? --</option>
                    <option value="4stole" <?= $answer10 == "4stole" ? 'selected' : '' ?>>All the packets are stolen by 192.168.2.4</option>
                    <option value="24Down" <?= $answer10 == "24Down" ? 'selected' : '' ?>>There is no 192.168.2.24 which is up</option>
                </select>
                and that 192.168.2.4 is the real server address.
            </p>
            <p>
                Then, at packet n°21, the client try to connect to the server at port 80. It
                <select name="answer11" required onchange="hideDefaultOption(this)">
                    <option value="" <?= empty($answer11) ? '' : 'style="display:none;"' ?> selected>-- work/doesn't work --</option>
                    <option value="work" <?= $answer11 == "work" ? 'selected' : '' ?>>work</option>
                    <option value="dtwork" <?= $answer11 == "doesn't work" ? 'selected' : '' ?>>doesn't work</option>,
                </select>
                After that, the client uses ping (ICMP protocol) to test the connection with the server, and it works. It probably mean that someone forgot the start the server.
            </p>
            <p>After a quite huge amount of failed tests and connections, the admin finally reach successfully the webserver on port 8000, and is able to see the content of a html page. The content is 
                <select name="answer12" required onchange="hideDefaultOption(this)">
                    <option value="" <?= empty($answer12) ? '' : 'style="display:none;"' ?> selected>-- page content --</option>
                    <option value="account-home" <?= $answer12 == "account-home" ? 'selected' : '' ?>>account home</option>
                    <option value="index" <?= $answer12 == "index" ? 'selected' : '' ?>>index</option>
                    <option value="hello-world" <?= $answer12 == "hello-world" ? 'selected' : '' ?>>hello world</option>.
                </select>
            </p>
            <br>
            <button type="submit">Send report</button>
            <p>The answer will be printed just below :</p>
        </form>
        
        <?php 
            sleep(1);

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

            if ($_SERVER["REQUEST_METHOD"] == "POST") {
                $correct_answers = [
                    "192.168.2.5",
                    "192.168.2.4",
                    "ARP",
                    "ping",
                    "HTTP",
                    "Everybody",
                    "find",
                    "TCP",
                    "TCP3WH",
                    "24Down",
                    "dtwork",
                    "hello-world"
                ];
                    
                $a1 = $_POST["answer1"] ?? "";
                $a2 = $_POST["answer2"] ?? "";
                $a3 = $_POST["answer3"] ?? "";
                $a4 = $_POST["answer4"] ?? "";
                $a5 = $_POST["answer5"] ?? "";
                $a6 = $_POST["answer6"] ?? "";
                $a7 = $_POST["answer7"] ?? "";
                $a8 = $_POST["answer8"] ?? "";
                $a9 = $_POST["answer9"] ?? "";
                $a10 = $_POST["answer10"] ?? "";
                $a11 = $_POST["answer11"] ?? "";
                $a12 = $_POST["answer12"] ?? "";
                
                $user_answers = [$a1,$a2,$a3,$a4,$a5,$a6,$a7,$a8,$a9,$a10,$a11,$a12];

                if (eqLists($correct_answers, $user_answers)) {
                    $message =  "Congratulations ! You correctly answered ! Here is the flag : \nCTFAC{network-analysis-9fa7c506f71}";
                } 
                else {
                    $message = "Incorrect(s) response(s). Please try again.";
                } 

                echo "<script type='js'>alert('$message');</script>";
                echo $message;
            }
        ?>
    </body>
</html>