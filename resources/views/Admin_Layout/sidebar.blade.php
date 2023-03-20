{{-- sidebar 2 --}}
<!-- Main Sidebar Container -->
<style>
    .nav-sidebar>.nav-item .nav-icon {
        margin-left: 0;

        margin-right: 0;
        text-align: none;
        width: auto;
    }
</style>

<!---------------------------Comapany and Salesaman and Admin Show Start code------------------------------>
<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="{{ url('software/dashboard') }}" class="brand-link">
        <img src="{{ asset('Theme2/dist/img/AdminLTELogo.png') }}" alt="AdminLTE Logo"
            class="brand-image img-circle elevation-3" style="opacity: .8">
        <span class="brand-text font-weight-light">Grab This Book</span>
    </a>

    <div class="sidebar">
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                data-accordion="false">
                <li class="nav-item ">
                    <a href="{{ url('dashboard') }}" class="nav-link {{ Request::is('/dashboard') ? 'active' : '' }} ">
                        <i class="nav-icon fas fa-tachometer-alt"></i>
                        <p>
                            Dashboard
                        </p>
                    </a>
                </li>

                <li
                    class="nav-item  {{ Request::is('payments/initiated')||Request::is('payments/rejected')||Request::is('payments/accepted') ? ' menu-is-opening menu-open' : '' }} ">
                    <a href="#" class="nav-link ">
                        <i class="fas nav-icon fa-list-alt"></i>
                        <p>
                            Payments

                            <i class="fas fa-angle-left right"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item ">
                            <a href="{{ url('/payments/initiated') }}"
                                class="nav-link  {{ Request::is('payments/initiated') ? 'active' : '' }}">
                                <i class="fa fa-hourglass-start"></i>
                                <p>Initiated</p>
                            </a>
                        </li>
                        <li class="nav-item ">
                            <a href="{{ url('/payments/accepted') }}"
                                class="nav-link  {{ Request::is('payments/accepted') ? 'active' : '' }}">
                                <i class="fa fa-check"></i>
                                <p>Accepted</p>
                            </a>
                        </li>
                        <li class="nav-item ">
                            <a href="{{ url('/payments/rejected') }}"
                                class="nav-link  {{ Request::is('payments/rejected') ? 'active' : '' }}">
                                <i class="far fa-user nav-icon"></i>
                                <p>Rejected</p>
                            </a>
                        </li>

                    </ul>

                </li>

                <li
                class="nav-item  {{  Request::is('upi/add') || Request::is('upi') ? ' menu-is-opening menu-open' : '' }} ">
                <a href="#" class="nav-link ">
                    <i class="fas nav-icon fa-list-alt"></i>
                    <p>
                        Settings

                        <i class="fas fa-angle-left right"></i>
                    </p>
                </a>
                <ul class="nav nav-treeview">
                    <li class="nav-item ">
                        <a href="{{ url('/upi/add') }}"
                            class="nav-link  {{ Request::is('upi/add') ? 'active' : '' }}">
                            <i class="fa fa-hourglass-start"></i>
                            <p>Add Upi</p>
                        </a>
                    </li>
                   
                    <li class="nav-item ">
                        <a href="{{ url('/upi') }}"
                            class="nav-link  {{ Request::is('upi') ? 'active' : '' }}">
                            <i class="far fa-user nav-icon"></i>
                            <p>Manage UPI's</p>
                        </a>
                    </li>

                </ul>

            </li>


        </nav>
    </div>
</aside>
<!---------------------------Comapany and Salesaman and Admin Show End code------------------------------>
