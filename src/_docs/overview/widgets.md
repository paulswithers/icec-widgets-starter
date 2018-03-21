---
title: Widgets
permalink: /docs/widgets/
---

Engagement Center widgets can be embedded in placeholders on every Connections Engagement Center page. Below is a list of widgets that ship with ICEC.  This lab is focus on building custom widgets; however, it is importnt to understand what is available.  It is also possible to make a copy of an existing widget to either override it or simply have a slightly modified version.

<ul class="nav nav-tabs">
  <li class="dropdown">
    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
      Blog-related widgets <span class="caret"></span>
    </a>
    <ul class="dropdown-menu">
      <li><a href="#blogs1" data-toggle="tab">News Channel or News Slider</a></li>
      <li><a href="#blogs2" data-toggle="tab">News List</a></li>
      <li><a href="#blogs3" data-toggle="tab">News Overview</a></li>
      <li><a href="#blogs4" data-toggle="tab">People Selector</a></li>
      <li><a href="#blogs5" data-toggle="tab">News</a></li>
      <li><a href="#blogs6" data-toggle="tab">Static Content – Blog</a></li>
      <li><a href="#blogs7" data-toggle="tab">Top News</a></li>
    </ul>
  </li>

  <li class="dropdown">
    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
      People and Profiles-related widgets <span class="caret"></span>
    </a>
    <ul class="dropdown-menu">
      <li><a href="#profiles1" data-toggle="tab">Community Members</a></li>
      <li><a href="#profiles2" data-toggle="tab">People Birthday (on-prem only)</a></li>
      <li><a href="#profiles3" data-toggle="tab">People Finder</a></li>
      <li><a href="#profiles4" data-toggle="tab">People Selector</a></li>
      <li><a href="#profiles5" data-toggle="tab">Preferences (on-prem only)</a></li>
      <li><a href="#profiles6" data-toggle="tab">Profile Completion (on-prem only) </a></li>
      <li><a href="#profiles7" data-toggle="tab">Profile Picture (on-prem only)</a></li>
      <li><a href="#profiles8" data-toggle="tab">Profile Tagging (on-prem only)</a></li>
      <li><a href="#profiles9" data-toggle="tab">Suggestions (on-prem only)</a></li>
    </ul>
  </li>

  <li class="dropdown">
    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
      Community-related widgets<span class="caret"></span>
    </a>
    <ul class="dropdown-menu">
      <li><a href="#community1" data-toggle="tab">Community Members</a></li>
      <li><a href="#community1" data-toggle="tab">People Birthday (on-prem only)</a></li>
    </ul>
  </li>

  <li class="dropdown">
    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
      Miscellaneous widgets<span class="caret"></span>
    </a>
    <ul class="dropdown-menu">
      <li><a href="#misc1" data-toggle="tab">Community Members</a></li>
      <li><a href="#misc2" data-toggle="tab">People Birthday (on-prem only)</a></li>
    </ul>
  </li>

</ul>
<div id="myTabContent" class="tab-content">

  <div class="tab-pane fade" id="blogs1">
      <p>NOTE: The News Channel and the News Slider widgets are the same.</p>
<p>Displays the first part of the content of blog entries along with the first image from each, regardless wherever that image is located in the blog post. Wider sizes show hints of the next blog entry, as seen below.</p>
<p>RECOMMENDATION: Use square images, not rectangular (at least for the first image).</p>
      <img src="../images/newsslider1.png">
      <br/>
      <img src="../images/newsslider2.png">
  </div>

   <div class="tab-pane fade" id="profiles1">
      <p>As you might expect, shows the members of a community. By default, it shows 5 to a page but that can be changed using the page size setting in the configuration (which is set to 4 in the images here).</p>
      <img src="../images/communitymembers.png">
      <br/>
      <img src="../images/communitymembers2.png">
  </div>
  <div class="tab-pane fade" id="profiles2">
    <p>NOTE: This only seems to work if you have entered the birthday properly in the user's Profile, which requires *-MM-DD format (note the leading asterisk).</p>
      <img src="../images/peoplebirthday1.png">
      <br><p>If you directly edit the user Profile, it shows an example of the correct date formatting. However, if you use the Preferences widget (as shown below) or the Profile Completion widget, it will NOT show the correct format and will accept all kinds of formats that won't work.</p>
      <img src="../images/peoplebirthday2.png">    
  </div>
</div>
