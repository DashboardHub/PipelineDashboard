<?php
namespace DashboardHub\Bundle\AppBundle\Service;

/**
 * Class Version
 * @package DashboardHub\Bundle\AppBundle\Service
 */
class VersionService
{
    /**
     * @var string
     */
    private $version;

    /**
     * @param string $version
     */
    public function __construct($version)
    {
        $this->version = $version;
    }

    /**
     * @return string
     */
    public function current()
    {
        return file_get_contents($this->version);
    }
}
