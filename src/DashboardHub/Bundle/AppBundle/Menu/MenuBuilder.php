<?php
namespace DashboardHub\Bundle\AppBundle\Menu;

use Knp\Menu\FactoryInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\SecurityContext;

/**
 * Class MenuBuilder
 * @package DashboardHub\Bundle\AppBundle\Menu
 */
class MenuBuilder
{
    /**
     * @var FactoryInterface
     */
    private $factory;
    /**
     * @var SecurityContext
     */
    private $securityContext;

    /**
     * @param FactoryInterface $factory
     */
    public function __construct(FactoryInterface $factory, SecurityContext $securityContext)
    {
        $this->factory         = $factory;
        $this->securityContext = $securityContext;
    }

    /**
     * @TODO: Move below to config
     *
     * @param Request $request
     *
     * @return \Knp\Menu\ItemInterface
     */
    public function createMainMenu(Request $request)
    {
        $menu = $this->factory->createItem('root');
        $menu->setChildrenAttributes(array('class' => 'navbar-nav nav'));
        $menu->addChild('Home', array('route' => 'dashboardhub_app_homepage'));

        if ($this->securityContext->isGranted('IS_AUTHENTICATED_FULLY')) {
            $menu->addChild(
                'Dashboard',
                array('route' => 'dashboardhub_app_dashboard.list')
            );
            $menu->addChild(
                'Logout ' . $this->securityContext->getToken()
                                                  ->getUser()
                                                  ->getUsername(),
                array('route' => 'logout')
            );
        } else {
            $menu->addChild('Login', array('route' => 'login'));
            $menu->addChild('Mock Login', array('route' => 'dashboardhub_app_mock.login'));
        }

        return $menu;
    }
}
