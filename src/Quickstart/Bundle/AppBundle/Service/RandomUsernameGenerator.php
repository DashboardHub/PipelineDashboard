<?php
namespace Quickstart\Bundle\AppBundle\Service;

/**
 * Class RandomUsernameGenerator
 * @package Quickstart\Bundle\AppBundle\Service
 */
class RandomUsernameGenerator
{

    /**
     * @return string
     */
    public function getUsername()
    {
        return uniqid('', true);
    }
}
