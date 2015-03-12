<?php

namespace DashboardHub\Bundle\DevelopmentBundle\Entity;

use DashboardHub\Bundle\AppBundle\Entity\User;

/**
 * Class MockUser
 * @package DashboardHub\Bundle\DevelopmentBundle\Entity
 */
class MockUser extends User
{

    /**
     * Return a password to be used by the development bundle
     * as opposed to the null returned by the parent class
     *
     * @return string
     */
    public function getPassword()
    {
        return 'IAmNotASecret';
    }
}
