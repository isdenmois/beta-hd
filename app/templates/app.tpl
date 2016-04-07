<header class="main-header">
    <a href="/" class="logo">
        <!-- LOGO -->
        zenTrack
    </a>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top" role="navigation">
        <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
        </a>
        <div class="navbar-custom-menu">
            <ul class="nav navbar-nav navbar-right">
                <!--<li>-->
                <!--<form class="navbar-search" role="search" action="/quickSearch.php">-->
                <!--<input type="text" class="form-control" id="navbar-search-input" name="idText" placeholder="Search">-->
                <!--</form>-->
                <!--</li>-->
                <!-- Tasks: style can be found in dropdown.less -->
                <li class="dropdown tasks-menu">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <i class="fa fa-clock-o"></i>
                        <span class="label label-info">7.3</span>
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <ul class="menu">
                                <li class="header"><a>You worked <b>156.15/168</b> hours</a></li>
                                <li>
                                    <a>7.30 hours today</a>
                                </li>
                                <li>
                                    <a>19 tickets closed</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <!-- Tasks: style can be found in dropdown.less -->
                <li>
                    <a href="#">
                        <i class="fa fa-flag-o"></i>
                        <span class="label label-danger">9</span>
                    </a>
                </li>
                <!-- User Account: style can be found in dropdown.less -->
                <li class="dropdown user user-menu">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <span class="fa fa-user"></span>
                        <span class="hidden-xs">{{username}}</span>
                    </a>
                    <ul class="dropdown-menu">
                        <!-- User image -->
                        <li class="user-header">
                            <p>
                                {{username}}<br>
                                {{job}}
                            </p>
                            <p>
                                {{email}}
                            </p>
                        </li>
                        <!-- Menu Footer-->
                        <li class="user-footer">
                            <div class="pull-left">
                                <a href="/options.php" class="btn btn-default btn-flat">Settings</a>
                            </div>
                            <div class="pull-right">
                                <a href="/index.php?logoff=1" class="btn btn-default btn-flat">Sign out</a>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>

    </nav>
</header>
<aside class="main-sidebar">

    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
        <ul class="sidebar-menu">
            <li class="header">Menu</li>

            <li>
                <!-- search form (Optional) -->
                <form action="/quickSearch.php" method="get" class="sidebar-form">
                    <div class="input-group">
                        <input type="text" name="idText" class="form-control" placeholder="Search...">
                          <span class="input-group-btn">
                            <button type="submit" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                            </button>
                          </span>
                    </div>
                </form>
                <!-- /.search form -->
            </li>
            <!-- Optionally, you can add icons to the links -->
            <li><a href="/projects.php"><i class="fa fa-file-powerpoint-o"></i> <span>Projects</span></a></li>
            <li class="active"><a href="/index.php"><i class="fa fa-tasks"></i> <span>Tickets</span></a></li>
            <li><a href="/options.php"><i class="fa fa-cog"></i> <span>Options</span></a></li>
            <li><a href="/help/index.php"><i class="fa fa-question"></i> <span>Help</span></a></li>
        </ul>

        <!-- Sidebar Menu -->
        <ul class="sidebar-menu">
            <li class="header">Tickets</li>
            <!-- Optionally, you can add icons to the links -->
            <li><a href="/newTicket.php"><i class="fa fa-plus"></i> <span>New Ticket</span></a></li>
            <li class="active"><a [routerLink]="['Assigned']"><i class="fa fa-tasks"></i> <span>My Tickets</span></a></li>
            <li><a href="/assignedProjectTickets.php"><i class="fa fa-file-powerpoint-o"></i> <span>My Projects</span></a></li>
            <li><a href="/search.php"><i class="fa fa-search"></i> <span>Search</span></a></li>
            <li><a href="/searchLogs.php"><i class="fa fa-search-plus"></i> <span>Search Logs</span></a></li>
        </ul>
    </section>
    <!-- /.sidebar -->
</aside>
<div class="content-wrapper">
    <div class="content-header">
        <h1>Assigned tickets</h1>
    </div>
    <div class="content">
        <router-outlet></router-outlet>
    </div>
</div>