<header class="main-header">
    <a class="logo">
        <span class="logo-lg">Initlab</span>
    </a>
    <nav class="navbar navbar-static-top" role="navigation">
        <div class="navbar-custom-menu">
            <ul class="nav navbar-nav navbar-left">
                <li><a [routerLink]="['Assigned']"><i class="fa fa-tasks"></i> <span>My Tickets</span></a></li>
            </ul>
        </div>

    </nav>
</header>

<div class="content-wrapper">
    <div class="content-header">
        <h1>Assigned tickets</h1>
    </div>
    <div class="content">
        <router-outlet></router-outlet>
    </div>
</div>