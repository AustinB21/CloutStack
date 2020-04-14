<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

//get the q parameter from URL
// $q=$_GET["q"];

// //find out which feed was selected
// if($q=="Google") {
//   $xml=("http://news.google.com/news?ned=us&topic=h&output=rss");
// } elseif($q=="Reddit") {
//   $xml=("http://fetchrss.com/rss/5e795a068a93f800478b45675e7960088a93f8900b8b4567.xml");
// }
$xml = ["http://news.google.com/news?ned=us&topic=h&output=rss", "http://fetchrss.com/rss/5e795a068a93f800478b45675e7960088a93f8900b8b4567.xml"];
$sources = ["Google", "Reddit"];
$count = 0;
$docs = [];
foreach($xml as $key) {
  $xmlDoc = new DOMDocument();
  $xmlDoc->load($key);

  //get elements from "<channel>"
  $channel=$xmlDoc->getElementsByTagName('channel')->item(0);
  $channel_title = $channel->getElementsByTagName('title')
  ->item(0)->childNodes->item(0)->nodeValue;
  $channel_link = $channel->getElementsByTagName('link')
  ->item(0)->childNodes->item(0)->nodeValue;
  $channel_desc = $channel->getElementsByTagName('description')
  ->item(0)->childNodes->item(0)->nodeValue;

  //get and output "<item>" elements
  
  $x=$xmlDoc->getElementsByTagName('item');
  for ($i=0; $i<=4; $i++) {
    $item_title=$x->item($i)->getElementsByTagName('title')
    ->item(0)->childNodes->item(0)->nodeValue;
    $item_link=$x->item($i)->getElementsByTagName('link')
    ->item(0)->childNodes->item(0)->nodeValue;
    $item_desc=$x->item($i)->getElementsByTagName('description')
    ->item(0)->childNodes->item(0)->nodeValue;
    $object = (object)[
      'title' => substr($item_title, 0, 99),
      'link' => substr($item_link, 0, 599),
      'description' => substr($item_desc, 0, 900),
      'from_where' => $sources[$count],
    ];
    array_push($docs, $object);
  }
  $count += 1;
}
usort($docs, function($a, $b){
  return strcmp($a->title, $b->title);
});
echo json_encode($docs);
?>